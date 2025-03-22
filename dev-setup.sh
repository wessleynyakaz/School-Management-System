#!/bin/bash

echo "Setting up School Portal development environment..."

# Check if PostgreSQL is running
pg_isrunning=$(pg_isready -q && echo "yes" || echo "no")
if [ "$pg_isrunning" != "yes" ]; then
  echo "ERROR: PostgreSQL is not running. Please start your database first."
  exit 1
fi

# Create database if it doesn't exist
echo "Checking PostgreSQL database..."
psql -U postgres -h localhost -c "SELECT 1 FROM pg_database WHERE datname='schoolportal'" | grep -q 1
if [ $? -ne 0 ]; then
  echo "Creating schoolportal database..."
  psql -U postgres -h localhost -c "CREATE DATABASE schoolportal"
fi

# Create .env files for each submodule if they don't exist
echo "Setting up environment variables..."


# Shared DB .env
if [ ! -f shared-db/.env ]; then
  echo "Creating shared-db .env file..."
  cat > shared-db/.env << EOL
DATABASE_URL="postgresql://postgres:pos@localhost:5432/schoolportal"
EOL
fi

# Student Portal .env
if [ ! -f student-portal/.env ]; then
  echo "Creating student-portal .env file..."
  cat > student-portal/.env << EOL
DATABASE_URL="postgresql://postgres:pos@localhost:5432/schoolportal"
NEXTAUTH_SECRET=schoolportalsecretkey
NEXTAUTH_URL=http://localhost:3000
FILE_SERVER_URL=http://localhost:8001
EOL
fi

# File Server environment setup - modified to use SQLite
if [ ! -f file_server/.env ]; then
  echo "Creating file_server .env file..."
  cat > file_server/.env << EOL
DEBUG=True
USE_SQLITE=True
EOL
fi

# Fix file_server Django settings
if [ -f file_server/file_server/settings.py ]; then
  echo "Updating file_server settings for local development..."
  # Create backup of original settings if it doesn't exist
  if [ ! -f file_server/file_server/settings.py.bak ]; then
    cp file_server/file_server/settings.py file_server/file_server/settings.py.bak
  fi
  
fi



# Install dependencies for file_server and migrate SQLite DB
echo "Setting up file server..."
cd file_server
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
pip install psycopg2-binary
export USE_SQLITE=True
echo "Resetting the database and migrations..."

# Check if the migrations directory exists before removing it
if [ -d "api/migrations" ]; then
    rm -r api/migrations
    echo "Migrations deleted"
else
    echo "Migrations directory does not exist. Skipping removal."
fi

# Check if the media directory exists before removing it
if [ -d "media" ]; then
    rm -r media
else
    echo "Media directory does not exist. Skipping removal."
fi

# Drop and recreate the database
rm -f db.sqlite3
python3 manage.py makemigrations
python3 manage.py makemigrations api
python3 manage.py migrate
deactivate
cd ..

# Install dependencies for student-portal
echo "Setting up student portal..."
cd student-portal
npm install


# Create Prisma directory structure if it doesn't exist
mkdir -p prisma
echo "Creating Prisma schema in student-portal..."
cat > prisma/schema.prisma << EOL
// This file references the shared schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
EOL

cd ..

# Start services in background
echo "Starting services..."

# Check if port 8001 is already in use
if lsof -Pi :8001 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 8001 is already in use. Please free this port before continuing."
    echo "You can use: sudo kill $(lsof -t -i:8001)"
    exit 1
fi

# Start file_server
cd file_server
source venv/bin/activate
python3 manage.py migrate
export DJANGO_DEBUG=True
export USE_SQLITE=True
python3 manage.py runserver 0.0.0.0:8001 &
FILE_SERVER_PID=$!
cd ..

echo "Waiting for file server to start..."
sleep 5

# Initialize shared database
echo "Setting up shared database..."
cd shared-db
npm install
npx prisma generate

# Handle database drift by resetting if needed
echo "Resetting the database and seeding initial data..."
npx prisma migrate reset --force || {
  echo "Failed to reset database. Continuing anyway."
}
cd ..

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 3000 is already in use. Please free this port before continuing."
    echo "You can use: sudo kill $(lsof -t -i:3000)"
    exit 1
fi

# Start student-portal
cd student-portal
npm run genClient
npm run dev &
STUDENT_PORTAL_PID=$!
cd ..

echo "Development environment is running!"
echo "File Server: http://localhost:8001"
echo "Student Portal: http://localhost:3000"
echo "Press Ctrl+C to stop all services"

# Trap to handle Ctrl+C and clean up
trap "echo 'Stopping services...'; kill $FILE_SERVER_PID $STUDENT_PORTAL_PID; exit" INT

# Wait for Ctrl+C
wait