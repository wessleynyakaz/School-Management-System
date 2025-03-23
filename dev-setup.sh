#!/bin/bash

echo "Setting up School Management System development environment..."

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
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
EOL
fi

# School Portal .env (SSO Gateway)
if [ ! -f school-portal/.env ]; then
  echo "Creating school-portal .env file..."
  cat > school-portal/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
NEXTAUTH_SECRET=schoolportalsecretkey
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=schoolportaljwtsecret
# Portal Subdomain Configuration
ADMIN_PORTAL_URL="http://admin.schoolname.ac.zw"
TEACHER_PORTAL_URL="http://teachers.schoolname.ac.zw"
ACCOUNTS_PORTAL_URL="http://accounts.schoolname.ac.zw"
STUDENT_PORTAL_URL="http://student.schoolname.ac.zw"
# Local Development URLs
DEV_ADMIN_PORTAL_URL="http://localhost:3001"
DEV_TEACHER_PORTAL_URL="http://localhost:3002"
DEV_ACCOUNTS_PORTAL_URL="http://localhost:3003"
DEV_STUDENT_PORTAL_URL="http://localhost:3004"
# Environment
NODE_ENV="development"
EOL
fi

# Student Portal .env
if [ ! -f student-portal/.env ]; then
  echo "Creating student-portal .env file..."
  cat > student-portal/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
JWT_SECRET=schoolportaljwtsecret
SCHOOL_PORTAL_URL=http://localhost:3000
NEXT_PUBLIC_SCHOOL_PORTAL_URL=http://localhost:3000
NODE_ENV=development
FILE_SERVER_URL=http://localhost:8001
EOL
fi

# Teacher Portal .env
if [ ! -f teacher-portal/.env ]; then
  echo "Creating teacher-portal .env file..."
  cat > teacher-portal/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
JWT_SECRET=schoolportaljwtsecret
SCHOOL_PORTAL_URL=http://localhost:3000
NEXT_PUBLIC_SCHOOL_PORTAL_URL=http://localhost:3000
NODE_ENV=development
EOL
fi

# Accounts Portal .env
if [ ! -f accounts-portal/.env ]; then
  echo "Creating accounts-portal .env file..."
  cat > accounts-portal/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
JWT_SECRET=schoolportaljwtsecret
SCHOOL_PORTAL_URL=http://localhost:3000
NODE_ENV=development
EOL
fi

# Admin Portal .env
if [ ! -f admin-portal/.env ]; then
  echo "Creating admin-portal .env file..."
  cat > admin-portal/.env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/schoolportal"
JWT_SECRET=schoolportaljwtsecret
SCHOOL_PORTAL_URL=http://localhost:3000
NODE_ENV=development
EOL
fi

# File Server environment setup - modified to use SQLite
if [ ! -f file_server/.env ]; then
  echo "Creating file_server .env file..."
  cat > file_server/.env << EOL
DEBUG=True
USE_SQLITE=True
JWT_SECRET=schoolportaljwtsecret
EOL
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

# Install dependencies for each portal
echo "Setting up all portals..."

# School Portal
cd school-portal
if [ ! -f package.json ]; then
  echo "Creating basic package.json for school-portal..."
  cat > package.json << EOL
{
  "name": "school-portal",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.10.0",
    "next-auth": "^4.24.5",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cookie": "^0.6.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/node": "^20.11.16",
    "prisma": "^5.10.0",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/cookie": "^0.6.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0"
  }
}
EOL
fi
npm install
mkdir -p prisma
if [ ! -f prisma/schema.prisma ]; then
  echo "Creating Prisma schema in school-portal..."
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
fi
cd ..

# Student Portal
cd student-portal
npm install
mkdir -p prisma
if [ ! -f prisma/schema.prisma ]; then
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
fi
cd ..

# Teacher Portal
cd teacher-portal
if [ ! -d node_modules ]; then
  npm install
fi
mkdir -p prisma
if [ ! -f prisma/schema.prisma ]; then
  echo "Creating Prisma schema in teacher-portal..."
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
fi
cd ..

# Accounts Portal
cd accounts-portal
if [ ! -d node_modules ]; then
  npm install
fi
mkdir -p prisma
if [ ! -f prisma/schema.prisma ]; then
  echo "Creating Prisma schema in accounts-portal..."
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
fi
cd ..

# Admin Portal
cd admin-portal
if [ ! -d node_modules ]; then
  npm install
fi
mkdir -p prisma
if [ ! -f prisma/schema.prisma ]; then
  echo "Creating Prisma schema in admin-portal..."
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
fi
cd ..

# Install dependencies for shared libraries
echo "Setting up shared libraries..."
cd shared
npm install
cd ..

# Install TypeScript dependencies for each portal
echo "Ensuring TypeScript dependencies for all portals..."
for portal in school-portal student-portal teacher-portal accounts-portal admin-portal; do
  cd $portal
  npm install --save-dev typescript @types/react @types/react-dom @types/node @types/jsonwebtoken
  # Ensure JSON Web Token
  npm install --save jsonwebtoken
  # Generate TypeScript types
  npx prisma generate
  cd ..
done

# Check available ports before starting services
echo "Checking ports availability..."
declare -A PORTS=(
  ["3000"]="School Portal"
  ["3001"]="Admin Portal"
  ["3002"]="Teacher Portal"
  ["3003"]="Accounts Portal"
  ["3004"]="Student Portal"
  ["8001"]="File Server"
)

for PORT in "${!PORTS[@]}"; do
  if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $PORT is already in use (${PORTS[$PORT]}). Please free this port before continuing."
    echo "You can use: sudo kill $(lsof -t -i:$PORT)"
    exit 1
  fi
done

# Start services in background
echo "Starting services..."

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
sleep 3


# Create Prisma directory structure in the shared-db
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

# Start School Portal (SSO Gateway)
cd school-portal
echo "Starting School Portal (SSO Gateway) on port 3000..."
npm run dev &
SCHOOL_PORTAL_PID=$!
cd ..

# Start Student Portal
cd student-portal
echo "Starting Student Portal on port 3004..."
npm run dev -- -p 3004 &
STUDENT_PORTAL_PID=$!
cd ..

# Start Teacher Portal
cd teacher-portal
echo "Starting Teacher Portal on port 3002..."
npm run dev -- -p 3002 &
TEACHER_PORTAL_PID=$!
cd ..

# Start Accounts Portal
cd accounts-portal
echo "Starting Accounts Portal on port 3003..."
npm run dev -- -p 3003 &
ACCOUNTS_PORTAL_PID=$!
cd ..

# Start Admin Portal
cd admin-portal
echo "Starting Admin Portal on port 3001..."
npm run dev -- -p 3001 &
ADMIN_PORTAL_PID=$!
cd ..

echo "Development environment is running!"
echo "School Portal (SSO): http://localhost:3000"
echo "Admin Portal: http://localhost:3001"
echo "Teacher Portal: http://localhost:3002"
echo "Accounts Portal: http://localhost:3003"
echo "Student Portal: http://localhost:3004"
echo "File Server: http://localhost:8001"
echo "Press Ctrl+C to stop all services"

# Trap to handle Ctrl+C and clean up
trap "echo 'Stopping services...'; kill $FILE_SERVER_PID $SCHOOL_PORTAL_PID $STUDENT_PORTAL_PID $TEACHER_PORTAL_PID $ACCOUNTS_PORTAL_PID $ADMIN_PORTAL_PID; exit" INT

# Wait for Ctrl+C
wait