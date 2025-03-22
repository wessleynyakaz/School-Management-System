FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Command will be overridden by docker-compose
CMD ["npx", "prisma", "migrate", "deploy"]