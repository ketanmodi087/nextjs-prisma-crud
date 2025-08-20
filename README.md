# Mini Projects CRUD

A Next.js application for managing projects with authentication and CRUD functionality.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your database (PostgreSQL recommended) and add connection string to `.env`:
4. Run database setup: `npx prisma db push`
5. Generate Prisma client: `npx prisma generate`
6. Start the development server: `npm run dev`

## Mock Authentication

- The app uses a simple cookie-based session system
- Enter any email on the login page to authenticate
- The session is stored in a cookie named `mini-projects-session`

## Cache Tags

The application uses Next.js cache tags for efficient revalidation:

- `project:{id}` - Individual project cache
- `projects:user:{email}` - User's project list cache
- `projects:public` - Public projects list cache

These tags are revalidated when projects are created, updated, or deleted.

## Features

- User authentication with email
- Create, read, update, and delete projects
- Project status tracking (planned, active, done)
- Public/private project visibility
- Search and filter functionality
- Responsive design with Tailwind CSS

## Database Schema

The application uses a simple Project model with the following fields:
- id: String (unique identifier)
- ownerEmail: String (user identifier)
- name: String (project name)
- description: String (optional project description)
- status: String (planned, active, or done)
- isPublic: Boolean (visibility setting)
- createdAt: DateTime
- updatedAt: DateTime