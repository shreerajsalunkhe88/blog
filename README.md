# Blog Post Management System

This repository contains a full-stack blog post management project with:
- a **Next.js + TypeScript frontend** (`frontend`)
- an **Express + MongoDB backend API** (`backend`)

The app is designed to create, edit, list, and manage blog posts through a clean UI connected to a REST API.

## Tech Stack

- Frontend: `Next.js 14`, `React 18`, `TypeScript`, `Tailwind CSS`
- Backend: `Node.js`, `Express`, `MongoDB`, `Mongoose`
- Validation and utilities: `express-validator`, `bcryptjs`, `uuid`

## Project Structure

```text
blog-main/
├── frontend/   # Next.js client app
└── backend/    # Express REST API
```

## Prerequisites

- Node.js (18+ recommended)
- npm
- MongoDB (local or cloud connection string)

## Environment Variables

Both apps include an `.env.example` file.

1. Copy the example file and create your own `.env`:
   - `frontend/.env`
   - `backend/.env`
2. Add the required values (API URL, DB connection string, etc.).

## Installation

Install dependencies separately for frontend and backend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run the Project

Start backend:

```bash
cd backend
npm run dev
```

Start frontend (in a new terminal):

```bash
cd frontend
npm run dev
```

## Available Scripts

### Backend
- `npm run dev` - Start API in watch mode
- `npm start` - Start API normally
- `npm run lint` - Lint backend source
- `npm run format` - Format backend source files

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build production app
- `npm run start` - Start production server
- `npm run lint` - Lint frontend code
- `npm run type-check` - Run TypeScript checks

## Core Features

- Create, read, update, and manage blog posts
- Form handling with reusable UI components
- Backend validation and structured API responses
- Pagination and post detail/edit pages in frontend routes

## Notes

- Keep backend and frontend running at the same time during development.
- Ensure frontend API base URL points to the running backend server.
