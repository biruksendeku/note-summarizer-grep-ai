# Note Summarizer Grep AI

`note-summarizer-grep-ai` is a small Node.js demo that processes note-search requests through a BullMQ worker. It searches a text corpus with `grep`, filters common stopwords, and exposes a Bull Board dashboard for inspecting queued jobs.

This project demonstrates a simple AI-style workflow without an external AI API: submitted keywords are used to build a regular-expression search pattern and matching lines are returned as the worker result.

## Features

- REST API for submitting search prompts
- Redis-backed BullMQ job queue
- Background worker for corpus searches
- Stopword filtering and escaped search terms
- Health check endpoint
- Bull Board dashboard for queue monitoring

## How It Works

1. `POST /ask` validates a prompt and adds a summarizer job to Redis.
2. The API immediately responds with `202 Accepted` and a job ID.
3. The worker removes stopwords and creates a case-insensitive `grep -E` pattern.
4. The worker searches `src/text_resources/corpus.txt`.
5. Job output can be inspected in the Bull Board dashboard.

## Technology

- Node.js
- Express
- BullMQ
- Redis
- Bull Board
- GNU-compatible `grep`

## Prerequisites

- Node.js and npm
- Redis
- A `grep` executable available on the system `PATH`

On Windows, install or enable a POSIX-compatible environment that provides `grep`, such as WSL or Git for Windows. Add it to `PATH` if Node.js cannot find `grep`.

## Installation

```bash
npm install
```

Create a local environment file:

```bash
copy .env.example .env
```

The default configuration is:

```dotenv
PORT=8000
NODE_ENV=development
REDIS_HOST=localhost
REDIS_PORT=6379
SUMMARIZER_QUEUE_NAME=summarizer-queue
```

Adjust these values if your Redis server or ports differ.

## Running the Project

Start Redis, then open two terminals.

In the first terminal, start the API:

```bash
npm start
```

For automatic API restarts during development:

```bash
npm run dev
```

In the second terminal, start the worker:

```bash
npm run start-worker
```

The API runs at `http://localhost:8000`.

## API

### Health check

`GET /health`

Example:

```bash
curl http://localhost:8000/health
```

Response:

```json
{
  "status": "ok",
  "uptime": 12.345,
  "timestamp": 1730000000000
}
```

### Submit a search

`POST /ask`

The prompt must contain at least two characters and may only contain letters, numbers, hyphens, and underscores.

PowerShell:

```powershell
curl.exe -X POST http://localhost:8000/ask `
  -H "Content-Type: application/json" `
  -d '{"prompt":"cat"}'
```

Example response:

```json
{
  "success": true,
  "jobId": "1",
  "status": "Summarizing in progress..."
}
```

## Queue Dashboard

Open Bull Board at:

```text
http://localhost:8000/admin/queues
```

The dashboard shows queued, completed, failed, and retrying jobs. It also exposes worker output and errors.

The dashboard is intended for local development and is not authentication-protected.

## Customizing the Corpus

Edit `src/text_resources/corpus.txt` to change the lines searched by the worker. Each non-empty matching line is returned as a separate match.

Edit `src/text_resources/stopwords.txt` to change which words are excluded from search patterns.

## Project Structure

```text
src/
  app.js                 Express application setup
  config/redis.js        Redis connection settings
  controllers/           HTTP request handlers
  middlewares/           Validation and error handling
  queues/                BullMQ queue setup
  routes/                Express routes
  text_resources/        Corpus and stopword data
  utils/                 Search and job helpers
  workers/               BullMQ worker
server.js                API entry point
```

## Troubleshooting

### Redis connection refused

Make sure Redis is running and verify `REDIS_HOST` and `REDIS_PORT` in `.env`.

### Search failed

Verify that `grep` is installed and available on `PATH`. The worker uses `grep -i -E`.

### Job does not complete

Confirm that both the API and worker processes are running and use the same Redis settings and queue name.

## License

This project declares the MIT license in `package.json`.
