# WatchMood

WatchMood is a full-stack movie recommendation app with an AI-powered backend and a Next.js frontend.

## What it does

- recommends movies from a short mood prompt
- stores movie reviews in SQLite
- stores embeddings and taste-profile data with ChromaDB
- regenerates a taste profile after every fifth review

## Project structure

| Path | Description |
| --- | --- |
| `watchmood-backend/` | FastAPI app, Pydantic AI agents, SQLite, TMDb integration |
| `watchmood-frontend/` | Next.js app for browsing movies and managing reviews |
| `docker-compose.yaml` | Runs both services together with persistent volumes |

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Axios
- **Backend:** FastAPI, Pydantic AI, SQLite, ChromaDB
- **External APIs:** TMDb, Gemini

## Running the app

Use Docker Compose from the repo root:

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:8000`

## Setup

### Prerequisites

- Docker Desktop
- Node.js 22+
- Python 3.13+
- `uv`
- TMDb API key
- Gemini API key

### Run with Docker

1. Create these env files:

   `watchmood-backend/.env`
   ```env
   TMDB_API_KEY=your_tmdb_key
   GEMINI_API_KEY=your_gemini_key
   ```

   `watchmood-frontend/.env`
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

2. Start the app:

   ```bash
   docker compose up --build
   ```

3. Open:

   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

### Run locally without Docker

#### Backend

1. Go to the backend folder:

   ```bash
   cd watchmood-backend
   ```

2. Create `.env`:

   ```env
   TMDB_API_KEY=your_tmdb_key
   GEMINI_API_KEY=your_gemini_key
   ```

3. Install dependencies:

   ```bash
   uv sync
   ```

4. Seed the movie database:

   ```bash
   uv run src/scripts/seed_movies.py
   ```

5. Start the API:

   ```bash
   uvicorn main:app --reload
   ```

#### Frontend

1. Go to the frontend folder:

   ```bash
   cd watchmood-frontend
   ```

2. Create `.env`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

3. Install dependencies:

   ```bash
   npm ci
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Environment variables

Backend:

- `TMDB_API_KEY`
- `GEMINI_API_KEY`

Frontend:

- `NEXT_PUBLIC_API_BASE_URL`

## Persistent data

The backend stores local data in:

- SQLite database: `watchmood-backend/watchmood.db` locally, or `/app/data/watchmood.db` in Docker
- ChromaDB store: `watchmood-backend/chroma_store/` locally, or `/app/chroma_store/` in Docker

When running with Docker, these should be mounted as volumes so data survives restarts.
