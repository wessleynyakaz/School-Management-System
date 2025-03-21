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
