# School Portal

The School Portal is a comprehensive web application that serves as a centralized platform for managing various aspects of a school's operations, including student and teacher portals, library management, and more.

## Features

The School Portal includes the following key features:

1. **Student Portal**:

   - Student profile management
   - Assignment tracking and submission
   - Resource library access
   - Attendance monitoring
   - Messaging and communication

2. **Teacher Portal**:

   - Class management
   - Assignment creation and grading
   - Student progress tracking
   - Attendance recording
   - Messaging and communication

3. **Library Management System**:

   - Book catalog and availability
   - Book borrowing and return
   - User (student and teacher) book requests
   - Librarian management tools

4. **School Portal Page**:
   - Centralized access point for all school-related information
   - Announcements and event management
   - Complaint and petition system
   - Reporting and analytics

## Submodules

This repository uses Git submodules for managing different portals. The following submodules are included:

- `student-portal`: Manages student-related functionalities.
- `teacher-portal`: Manages teacher-related functionalities.
- `accounts-portal`: Handles accounts and billing.
- `admin-portal`: Provides administrative tools.
- `file_server`: Manages file storage and sharing.

## Initializing Submodules

After cloning the repository, initialize and update the submodules using the following commands:

```bash
git submodule init
git submodule update
```

Alternatively, you can clone the repository along with its submodules in one step:

```bash
git clone --recurse-submodules <repository-url>
```

## Development Setup

For local development:

1. Make sure PostgreSQL is installed and running
2. Run the development setup script:

```bash
chmod +x dev-setup.sh
./dev-setup.sh
```

This script will:

- Set up the shared database
- Generate Prisma client
- Start the file server for file storage
- Start the student portal development server

## Deployment

### Using Docker Compose

To deploy the entire application with Docker Compose:

1. Create a `.env` file with your configuration:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=securepassword
POSTGRES_DB=schoolportal
NEXTAUTH_SECRET=yoursecretkey
NEXTAUTH_URL=https://your-domain.com
```

2. Build and start all services:

```bash
docker-compose up -d
```

3. Access the different portals at:
   - Student Portal: http://localhost:3000
   - Teacher Portal: http://localhost:3001
   - Accounts Portal: http://localhost:3002
   - Admin Portal: http://localhost:8000
   - File Server: http://localhost:8001
