Project: Minimal Viable Workspace for Multi-Portal School Management System

Overview:
We are building a multi-portal School Management System with the following Next.js apps:
  - School Portal (Entry-level, handles centralized authentication and token issuance)
  - Admin Portal
  - Teacher Portal
  - Accounts Portal
  - Student Portal

All apps use Next.js App Router v15, introspect a centralized shared-db via Prisma (models are already set up), and are containerized via Docker. The School Portal acts as the Single Sign-On (SSO) gateway that authenticates users, issues tokens (e.g., JWT), and redirects them to the appropriate subdomain/portal (e.g., student.schoolname.ac.zw, teachers.schoolname.ac.zw, etc.).

Goals:
1. **School Portal (SSO Gateway)**
   - Create a Next.js app that displays a landing/login page.
   - On login, authenticate the user (using NextAuth or custom JWT logic) against the shared-db.
   - Issue a token and determine the user’s role.
   - Redirect the user to the correct portal (Admin, Teacher, Accounts, or Student) based on a deployment-specific configuration (mapping roles to subdomains).
   - Pass the token via URL parameters or secure cookie for further authentication in the destination portal.

2. **Individual Portals (Admin, Teacher, Accounts, Student)**
   - Each portal is a Next.js app that uses a boilerplate already available in our directory structure.
   - Each app should introspect the current state of the db and use that to generate its prisma client.
   - Implement Next.js middleware (in app/middleware.ts) to validate the token received from the School Portal, enforce role-based access, and handle any further authentication/authorization logic.
   - Each portal may further implement its own internal role-based logic (e.g., within the Teacher Portal, differentiate between a head, deputy, or regular teacher).

3. **Dockerization**
   - Create Dockerfiles for each of the Next.js apps (School Portal, Admin, Teacher, Accounts, Student).
   - Use a Docker Compose configuration to build and deploy all apps as separate containers.
   - Each container should receive tenant-specific environment variables (e.g., DATABASE_URL, JWT_SECRET, role-to-subdomain mapping).
   - Ensure the reverse proxy (or DNS configuration) directs subdomains to the appropriate container (e.g., student.schoolname.ac.zw routes to the Student Portal container).

4. **Token Passing & Environment Configuration**
   - The School Portal must pass a JWT (or similar token) to the individual portals upon successful login.
   - The token passing mechanism can be via HTTP redirection with token query parameters or secure cookies.
   - Each portal’s middleware should validate the token and, if valid, load user details and role-based settings from the shared-db.
   - The deployment configuration (environment variables or config files) should determine the subdomain mapping (for redirection) so that the logic remains flexible per school instance.

Tasks for GitHub Copilot:
- **School Portal Setup:**
  - Scaffold a Next.js app in `/school-portal` that includes a login page.
  - Implement the authentication API route (using NextAuth or custom JWT logic) to authenticate users against the shared-db.
  - After login, read the role from the user profile and look up the corresponding subdomain from a configuration (e.g., a JSON file or environment variables).
  - Redirect the user to the appropriate portal URL, passing along the token.
  
- **Individual Portal Setup (Admin, Teacher, Accounts, Student):**
  - In each app's boilerplate (located in `/admin-portal`, `/teacher-portal`, `/accounts-portal`, `/student-portal`), import the centralized Prisma client from `/prisma/client.ts`.
  - Set up Next.js middleware in each app (`app/middleware.ts`) to intercept requests and verify the token passed from the School Portal.
  - Implement role-based checks to ensure that only users with the proper permissions can access specific pages.
  
- **Dockerization:**
  - Create a `Dockerfile` in each portal directory to build the Next.js app.
  - Write a `docker-compose.yml` in the root directory to spin up all portals as separate containers.
  - Configure environment variables for each container (DATABASE_URL, JWT_SECRET, SUBDOMAIN_MAPPINGS, etc.).
  - Optionally, set up an Nginx reverse proxy container that routes requests based on subdomain to the correct Next.js app container.
  
- **Documentation & Configuration:**
  - Document how to update tenant-specific configuration (e.g., subdomain mapping, role definitions).
  - Provide instructions for running the workspace locally and in production.

Final Comprehensive Prompt for Copilot:
------------------------------------------------------------

Project: Minimal Viable Workspace for Multi-Portal School Management System

Setup Requirements:
1. School Portal:
   - Next.js app in /school-portal.
   - Contains a login/landing page for centralized authentication.
   - On login, authenticates user against the shared-db (via Prisma) and issues a JWT.
   - Reads tenant-specific configuration to map user roles to subdomains.
   - Redirects user to the appropriate portal URL with the JWT passed (via query parameter or secure cookie).

2. Individual Portals:
   - Next.js apps for Admin (/admin-portal), Teacher (/teacher-portal), Accounts (/accounts-portal), and Student (/student-portal).
   - Each app uses a boilerplate that introspects the shared-db with Prisma.
   - Implement middleware in each app (app/middleware.ts) to validate JWT tokens received from the School Portal.
   - Enforce role-based access controls (e.g., within the Teacher Portal, further differentiate teacher roles).
   
3. Docker & Deployment:
   - Create Dockerfiles for each portal app.
   - Use a docker-compose.yml in the root to orchestrate multi-container deployment.
   - Pass necessary environment variables (DATABASE_URL, JWT_SECRET, SUBDOMAIN_MAPPINGS, etc.) to each container.
   - Optionally, configure an Nginx reverse proxy container to handle subdomain routing.
   
4. Token Passing:
   - On successful authentication in the School Portal, pass the JWT to the destination portal.
   - Each destination portal validates the token and loads user-specific role-based configurations.
   
5. Documentation:
   - Include instructions on updating tenant-specific settings.
   - Document how to run the system locally and deploy in production.
   
Ensure the codebase remains modular, with each portal focusing on its domain logic while the School Portal handles centralized authentication and redirection. 

Implement the above requirements in one commit, ensuring a minimal viable workspace setup.

------------------------------------------------------------
