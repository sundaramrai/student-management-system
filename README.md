# Student Management System

A full-stack application for managing student records with CRUD, photo uploads, search, filters, pagination, and activity logs.

## Features

- Create, view, update, and delete student records
- Upload student photos in JPG, JPEG, or PNG format
- Auto-generated admission numbers
- Search and filter students by course, gender, and year
- Pagination for student and activity log lists
- Activity history for create, update, and delete actions

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Forms and validation: React Hook Form, Zod
- Data fetching: TanStack Query, Axios

## Prerequisites

- Node.js 18 or later
- PostgreSQL database

## Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `backend/.env`.

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Set `VITE_API_BASE_URL` in `frontend/.env`.

## Environment Variables

### `backend/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/student_management"
PORT=5000
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Database Setup

```bash
cd backend
npx prisma migrate dev --name init
npm run db:seed
npm run db:studio
```

## Run Locally

### Backend Run

```bash
cd backend
npm run dev
```

### Frontend Run

```bash
cd frontend
npm run dev
```

## API Overview

- `GET /api/students` - List students
- `GET /api/students/courses` - List distinct course names
- `GET /api/students/:id` - Get a student by ID
- `POST /api/students` - Create a student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/activity-logs` - List activity logs
