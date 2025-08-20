## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your database (PostgreSQL recommended) and add connection string to `.env`:
4. Run database setup: `npx prisma db push`
5. Generate Prisma client: `npx prisma generate`
6. Start the development server: `npm run dev`

## Features

- User authentication with email
- Create, read, update, and delete projects
- Project status tracking (planned, active, done)
- Public/private project visibility
- Search and filter functionality
- Responsive design with Tailwind CSS

