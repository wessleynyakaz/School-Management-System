# School Management System

A multi-portal School Management System with Single Sign-On (SSO) capabilities.

## Overview

This system consists of multiple Next.js applications that work together to provide a comprehensive school management solution:

- **School Portal**: The entry point and SSO gateway for the system
- **Admin Portal**: For school administrators
- **Teacher Portal**: For teachers and education staff
- **Accounts Portal**: For financial management
- **Student Portal**: For students to access their information
- **File Server**: For document management

## Architecture

- All portals use Next.js with App Router (v14)
- Authentication is centralized in the School Portal
- Each portal has role-based access controls
- All portals connect to a shared PostgreSQL database via Prisma
- The system is containerized with Docker

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Python 3.8+ (for File Server)
- Docker and Docker Compose (for production deployment)

### Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/school-management-system.git
   cd school-management-system
   ```

2. Run the development setup script:

   ```bash
   chmod +x dev-setup.sh
   ./dev-setup.sh
   ```

   This script will:

   - Check if PostgreSQL is running
   - Create the database if it doesn't exist
   - Set up environment variables for all portals
   - Install dependencies
   - Start all services

3. Seed test users for development:

   ```bash
   cd shared-db
   node ../seed-test-users.js
   cd ..
   ```

4. Access the portals:

   - School Portal (SSO): http://localhost:3000
   - Admin Portal: http://localhost:3001
   - Teacher Portal: http://localhost:3002
   - Accounts Portal: http://localhost:3003
   - Student Portal: http://localhost:3004
   - File Server: http://localhost:8001

5. Use the following test credentials:
   - Admin: admin@school.com / password
   - Teacher: teacher@school.com / password
   - Head Teacher: headteacher@school.com / password
   - Deputy Head: deputyhead@school.com / password
   - Accounts: accounts@school.com / password
   - Student: student@school.com / password

### Testing

1. To test all components of the system:

   ```bash
   chmod +x test-system.sh
   ./test-system.sh
   ```

2. Manual testing workflow:
   - Open http://localhost:3000 (School Portal)
   - Log in with one of the test credentials
   - You should be redirected to the appropriate portal based on your role
   - Test navigation and permissions in each portal

### Docker Deployment

1. Build and start all containers:

   ```bash
   docker-compose up -d
   ```

2. To stop the containers:
   ```bash
   docker-compose down
   ```

## Directory Structure

The system supports two different app structures:

- Standard Next.js App Router: `/app` directory
- Source directory structure: `/src/app` directory

Middleware files are placed accordingly:

- For standard structure: `/app/middleware.ts`
- For source structure: `/src/app/middleware.ts`

## Tenant-Specific Configuration

### Subdomain Mapping

Edit the `.env` file to map roles to subdomains:

```
ADMIN_PORTAL_URL=http://admin.yourschool.ac.zw
TEACHER_PORTAL_URL=http://teachers.yourschool.ac.zw
ACCOUNTS_PORTAL_URL=http://accounts.yourschool.ac.zw
STUDENT_PORTAL_URL=http://student.yourschool.ac.zw
```

### Role Definitions

Roles are configured in the database. The default roles are:

- admin
- teacher
- head_teacher
- deputy_head
- accounts
- student

## Production Deployment

For production deployment, additional steps are required:

1. Set up SSL certificates for HTTPS
2. Configure a proper domain and DNS settings
3. Update environment variables with production values
4. Set `NODE_ENV=production`

## License

[License information here]
