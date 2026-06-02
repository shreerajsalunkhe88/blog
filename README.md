# Blog Post Manager

Full-stack blog management app with:
- **Frontend:** Next.js (Vercel-ready)
- **Backend:** Express + MongoDB
- **Database:** MongoDB Atlas/local MongoDB

## Project Structure

```
blog/
  frontend/   # Next.js app
  backend/    # Express API
```

## Features

- Create, edit, delete blog posts
- List, search, filter, and paginate posts
- CSV export
- Category and status support
 
## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Backend Setup (`backend`)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   API_VERSION=v1
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGINS=http://localhost:3000
   ```
3. Run:
   ```bash
   npm run dev
   ```

Backend base URL (local):  
`http://localhost:5000/api/v1`

Health check:  
`http://localhost:5000/api/health`

## Frontend Setup (`frontend`)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```
3. Run:
   ```bash
   npm run dev
   ```

Frontend local URL:  
`http://localhost:3000`

## Production Deployment

### Frontend (Vercel)

Set:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
```

### Backend (Render)

Set:
```env
NODE_ENV=production
API_VERSION=v1
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGINS=https://your-vercel-domain.vercel.app,https://*.vercel.app
```

## Common Issues

- **404 on `/posts/...`**  
  Use `NEXT_PUBLIC_API_URL` with `/api/v1` suffix.

- **CORS errors**  
  Ensure frontend domain is included in `CORS_ORIGINS` and redeploy backend.

- **400 Validation failed**  
  Check required fields like `title`, `author`, `email`, `category`, `shortDescription`, and `content`.

## Scripts

### Frontend
- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - start production server

### Backend
- `npm run dev` - start development server
- `npm start` - start production server
