# Nodejs Application

This application was developed with Express and Prisma in the context of a school project.

## Prerequisites

Make sure you have installed the following:

- Nodejs
- PostgreSQL on you system

## Installation

After cloning the project, follow these steps:

- Go to the project directory:

```bash
cd nodejs-application
```

- Install the dependencies:

```bash
npm install
```

- Create a .env file in the root of the project and add the following variables:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>"
PORT="3001"
ACCESS_TOKEN_SECRET="secret"
REFRESH_TOKEN_SECRET="secret"
ROLE_ADMIN="30"
ROLE_USER="10"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
CALLBACK_GOOGLE_URL="http://localhost:3001/api/auth/google/callback"
SESSION_SECRET_KEY="secret"
```

- Complete the variables with your own values (make sure to have a ROLE_USER inferior to a ROLE_ADMIN).
- Push the database schema to your database:

```bash
npx prisma db push --schema ./src/prisma/schema.prisma
```

If it's not working, create the database manually in Postgres and then run the command again.

## Start the application

Once the installation is complete, you can start the application with the following command:

```bash
npm start
```