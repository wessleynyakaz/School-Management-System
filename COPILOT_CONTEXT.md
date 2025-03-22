# Project Context: Multi-Tenant School Management System

## Overview
This project is a multi-tenant School Management System designed to serve multiple schools (tenants) using a shared codebase. Each school instance can be configured differently without changing the underlying code. Key features include:

- **Multi-Tenant Architecture**:  
  Each tenant (school) has its own configuration settings (e.g., login behavior, subdomain routing) while sharing a central codebase.

- **Subdomain Deployment**:  
  - **student.school.ac.zw**  
  - **teachers.school.ac.zw**  
  - **accounts.school.ac.zw**  
  - **admin.school.ac.zw**  
  A central landing page (e.g., login.school.ac.zw) authenticates users and redirects them based on role.

- **Centralized Shared Database (shared-db)**:  
  A PostgreSQL database managed via Prisma with a centralized schema (`/prisma/schema.prisma`) and a universal seed (`/prisma/seed.ts`).

- **Centralized Authentication (SSO)**:  
  Uses Next.js App Router v15 with middleware for role-based access. The system supports SSO via a dedicated landing/login page, which determines user roles (student, teacher, admin, head of school, etc.) and redirects to the appropriate subdomain.

- **Shared Services**:  
  - **Authentication Service**: Centralized SSO with JWT/NextAuth.  
  - **Logging Service**: Aggregates logs for the admin portal.  
  - **Analytics Service**: Provides reports visible only to the head of school.  
  - **Notification Service**: Manages emails, SMS, and in-app notifications.  
  - **File Server**: A Django-based server for handling file uploads/downloads.

- **Deployment with Docker**:  
  Each app is containerized and deployed via Docker (using Docker Compose or Kubernetes). The system uses a reverse proxy (e.g., Nginx) to map subdomains to their corresponding containers. Environment variables drive tenant-specific configuration.

## Technology Stack
- **Frontend**: Next.js (App Router v15)
- **Backend**: Node.js, Prisma ORM, PostgreSQL
- **File Server**: Django
- **Authentication**: NextAuth or custom JWT-based middleware
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (for subdomain routing)

## Design Considerations
- **Flexibility**: The same codebase supports various configurations per tenant, so each school can choose its preferred deployment (e.g., login on the landing page or separate).
- **Separation of Concerns**:  
  Each subdomain app (student, teachers, accounts, admin) focuses on its core features while shared services (authentication, logging, analytics, notifications) provide common functionalities.
- **Security**:  
  Role-based access is enforced via Next.js middleware. Sensitive endpoints (logs, analytics) are restricted to specific roles.
- **Scalability**:  
  The architecture is designed for easy deployment and scaling via container orchestration.

## How to Use This Context
- **For GitHub Copilot**:  
  This document provides the necessary context so that suggestions, completions, and generated code are aligned with our architecture and design principles.
- **For New Developers**:  
  Use this document as a reference to understand the overall structure and key decisions of the project.

---

By including this file in your repository, you give Copilot (and other developers) a clear, comprehensive overview of your system’s context, ensuring that auto-generated code and suggestions are tailored to your multi-tenant architecture and design needs.
