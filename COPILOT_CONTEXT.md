# Project Context: Multi-Tenant School Management System

## Overview
This project is a multi-tenant School Management System with several Next.js apps (Admin, Teacher, Accounts, Student) and a centralized School Portal that handles authentication and redirection.

- **Authentication:** The School Portal serves as a Single Sign-On (SSO) gateway.
- **Portals:** Each app (Admin, Teacher, etc.) handles role-specific logic after authentication.
- **Database:** All apps connect to a shared PostgreSQL database via Prisma.
- **Deployment:** Each portal is containerized using Docker, and subdomain mapping is controlled via environment configurations.
