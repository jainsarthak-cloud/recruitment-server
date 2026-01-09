# 🚀 Sheryians Recruitment Platform (Backend)

This repository contains the backend for the Sheryians Recruitment Platform — a RESTful API and background workers that power the recruitment client.

## 📦 Tech Stack
- Node.js
- Express (app entry: `src/app.js`)
- MongoDB (database connection in `src/config/database.js`)
- Redis (caching + job queues)
- Bull / custom queues (background workers in `src/workers/`)
- AWS S3 (file uploads / signed URLs)

## ⚡ Quick Start

bash

# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Create a `.env` file (see Environment section below)

# Start development server
npm run dev

Then visit your API at: http://localhost:5000 (or the port in your `.env`)

## Environment
Create a `.env` file in the project root with the following commonly-used variables:

- `PORT` — server port (default: 5000)
- `MONGO_URI` — MongoDB connection string
- `REDIS_URL` — Redis connection URL
- `JWT_SECRET` — JWT signing secret
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET` — for S3 uploads
- Email settings (SMTP host, port, user, pass) if email sending is used

The exact env vars the project checks live in `src/config/environment.js`.

## Project Structure

src/
 ├── app.js                 # Express app initialization
 ├── config/                # Configs (database, redis, aws, environment)
 ├── controllers/           # Route controllers
 ├── routes/                # Express route definitions
 ├── models/                # Mongoose models
 ├── services/              # Business logic and integrations
 ├── repositories/          # DB access abstractions
 ├── middlewares/           # Express middlewares (auth, validation, etc.)
 ├── workers/               # Background job processors
 ├── agents/                # AI agents / special modules (QuestionGenerator, etc.)
 └── utils/                 # Helpers and utilities

Other top-level items:
- `server.js` — process entry used in production / start script
- `logs/` — runtime logs

## Common Tasks

- Run in development: `npm run dev` (uses `server.js`/`nodemon` depending on scripts)
- Start production: `npm start` or `node server.js`
- Run workers: start the worker processes (example: `node src/workers/worker.js` or the provided npm script if available)

Check `package.json` for available npm scripts specific to this repo.

## Databases & Queues

- MongoDB: configured in `src/config/database.js`. Ensure `MONGO_URI` points to your database.
- Redis: used for caching and job queues. Ensure `REDIS_URL` is set.
- Queues & workers: job definitions live in `src/queues/` and processors in `src/workers/`.

## Deployment Notes

- Provide environment variables in your host (Heroku, DigitalOcean, AWS, etc.).
- Ensure both MongoDB and Redis are reachable by the deployed instance.
- Configure proper S3 credentials and CORS for uploads if using S3.

## Observability

- Logs are persisted under `logs/`. Integrate with external logging (Papertrail, Datadog) for production.

## Contributing
See the main CONTRIBUTING guide in the repository's `docs/` folder: `docs/CONTRIBUTING.md`.

## Useful Links
- Configs: `src/config/`
- API controllers: `src/controllers/`
- Background workers: `src/workers/`

---

If you want, I can also generate a concise `docs/setup-backend.md` with step-by-step environment setup and example `.env` content. Would you like that?
