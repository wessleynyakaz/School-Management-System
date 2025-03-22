# School Portal Shared Database

This module serves as the single source of truth for database schema and seed data across all School Portal submodules.

## Overview

The shared-db module contains:

- Prisma schema definitions for all database models
- Migration scripts
- Seed data and seeding logic


## Detail


### Using with Submodules

Each submodule should:
1. Connect to the same database
2. NOT define their own schema files
3. NOT run their own migrations
4. Rely on the shared-db for all database structure

### Managing Schema Changes

1. Always make schema changes in this module
2. Run migrations from this module
3. Update seed data as needed
4. Push changes to all environments

### Deployment

In production environments, the `db-init` container uses this module to:
1. Apply migrations
2. Seed the database before other services start

## Setup

### Development

1. Install dependencies:
   ```bash
   npm install
   ```
