# Tapaal Management System

A full-stack mail management system with separated frontend and backend architecture.

## Project Structure

```
tapaal/
├── frontend/          # React frontend application
│   ├── src/          # React source code
│   ├── dist/         # Build output
│   ├── package.json  # Frontend dependencies
│   └── vite.config.ts # Vite configuration
├── backend/           # Node.js backend API
│   ├── server/       # Express server code
│   ├── prisma/       # Database schema and migrations
│   ├── uploads/      # File upload storage
│   └── package.json  # Backend dependencies
└── package.json      # Root package with orchestrator scripts
```

## Installation

1. Install dependencies for all parts:
   ```bash
   npm run install:all
   ```

## Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

Run individually:
- Frontend only: `npm run dev:frontend`
- Backend only: `npm run dev:backend`

## Production

Build the frontend:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- i18next

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- Prisma ORM
- JWT Authentication
