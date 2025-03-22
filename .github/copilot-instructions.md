Project: Multi-Tenant School Management System

Overview:
We are building a multi-tenant School Management System where each school (tenant) can deploy its instance with customized configurations. The underlying code remains unchanged across tenants; however, each client can choose their preferred setup (e.g., login page on the landing page, hosting admin and accounts on private servers, etc.) via external configuration.

Architecture:
1. Shared Codebase:
   - All tenants use the same code (Next.js apps for student, teachers, accounts, admin, etc.).
   - The shared-db (PostgreSQL with Prisma) and centralized services remain consistent across deployments.
   
2. Tenant-Specific Configuration:
   - Create a configuration module that loads tenant-specific settings based on the request’s domain or environment variable.
   - Use a configuration file (or service) that defines tenant-specific options such as:
     • Whether the landing page includes the login page.
     • Which portals (admin, accounts, etc.) are hosted on which server/subdomain.
     • Role-specific settings, UI themes, and any custom endpoints.
   - Example: For tenant 'ABC School', configuration may indicate:
         { tenantId: "abc", landingPage: { showLogin: true }, portals: { student: "student.abc.school.ac.zw", teachers: "teachers.abc.school.ac.zw", admin: "admin.abc.school.ac.zw", accounts: "accounts.abc.school.ac.zw" } }
   - This configuration is injected into the app at runtime, so the same code can be deployed with different behavior.

3. Centralized Authentication and Routing:
   - Use a central authentication (SSO) service that loads tenant-specific behavior.
   - On login, the system checks the tenant’s configuration to determine redirection and role-based access.
   - Next.js middleware (app/middleware.ts) enforces role-based access control, checking the tenant configuration as needed.

4. Docker Deployment for Multi-Tenant Instances:
   - Each Next.js app (or container) is built once, and configuration is injected via environment variables or a mounted configuration file.
   - Use a reverse proxy (e.g., Nginx) to direct requests based on the tenant's subdomain.
   - The same Docker image is deployed for all tenants; behavior is controlled solely by configuration.

Instructions for Copilot:
- Develop a tenant configuration module (e.g., /config/tenantConfig.ts) that:
    • Loads a JSON configuration file or reads environment variables.
    • Determines the tenant based on the domain (e.g., "abc.school.ac.zw" → tenant "abc") and returns configuration options.
- In the central authentication Next.js app (landing/login page), incorporate this tenant configuration to:
    • Show or hide the login form based on configuration.
    • Redirect users to the appropriate subdomains after login based on tenant settings.
- In each submodule (student, teachers, accounts, admin):
    • Import the tenant configuration module to adjust behavior (like API endpoints or UI elements) dynamically.
    • Use Next.js middleware to enforce role-based authorization, taking into account tenant-specific roles if needed.
- Ensure that the shared-db and centralized Prisma client (located in /prisma) remain unchanged, and all services interact with the same codebase.
- Create Dockerfiles for each Next.js app and a Docker Compose configuration that:
    • Passes tenant-specific environment variables into the containers.
    • Configures a reverse proxy to route requests to the appropriate container based on the subdomain.

- Accounts, admin and teacher portal should share components and they both use the flowbite as the css framework. 

- Commmon utils, hooks and other common files should have a submodule in the root dir

- make sure that the schema and the prisma client is consistent on all submodules and on each change in the schema, changes on the client are made

Final GitHub Copilot Prompt:
------------------------------------------------------------
/*
Project: Multi-Tenant School Management System with Tenant-Specific Configurations

Goals:
1. Build a shared codebase (Next.js apps for student, teachers, accounts, admin) that is multi-tenant.
2. Create a tenant configuration module (/config/tenantConfig.ts) that loads tenant-specific settings based on the request domain or environment variables.
3. In the central authentication (SSO) app (landing/login page), use the tenant configuration to:
    - Determine if the landing page should include the login form.
    - After successful login, redirect users to their tenant-specific subdomain based on role.
4. Refactor all submodules to import tenant configuration, so UI elements, API endpoints, and behavior are dynamically set per tenant.
5. Use Next.js App Router v15 middleware to enforce role-based access control, referencing tenant configurations where necessary.
6. Create Dockerfiles for each app and a Docker Compose file to deploy them as containers, with environment variables that define tenant-specific configurations.
7. Ensure that the shared-db (PostgreSQL with Prisma) remains a single source of truth, and that all services use the centralized Prisma client from /prisma/client.ts.
8. Document how tenant configurations can be updated per school without modifying the codebase.

Ensure that all these changes allow us to deploy an instance for each school (tenant) where the configuration (e.g., login page behavior, portal hosting) can differ while the core code remains unchanged.

------------------------------------------------------------
