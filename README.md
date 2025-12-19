# Recruitment-Server

An enterprise-grade backend service for recruitment and candidate management, featuring **MongoDB Atlas Search**, AI-powered interview tooling, background workers, and scalable architecture.

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Key architecture principles](#key-architecture-principles)
- [MongoDB Atlas Search integration](#mongodb-atlas-search-integration)
- [Quick start](#quick-start)
- [Environment & configuration](#environment--configuration)
- [Development notes](#development-notes)
- [Contributing](#contributing)

---

## Overview

This repository implements a **production-ready Node.js backend** built with Express and MongoDB Atlas.
It supports:

- Authentication & user management
- Job & application management
- **Lucene-powered search using MongoDB Atlas Search**
- AI-assisted interview workflows (question generation & evaluation)
- Background processing via queues and workers

The architecture follows **clean separation of concerns**, making it scalable, testable, and team-friendly.

---

## Tech stack

- **Runtime:** Node.js (18+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Search Engine:** MongoDB Atlas Search (Apache Lucene)
- **ORM/ODM:** Mongoose
- **Queues:** BullMQ / Redis
- **AI Layer:** Prompt + agent-based orchestration
- **Infra-ready:** AWS S3 (optional), Redis, CI-friendly env validation

---

## Project structure

### Root

- `README.md` — project overview & usage
- `package.json` — dependencies & scripts
- `server.js` — application entry point
- `.env.example` — environment variable template
- `logs/` — runtime logs (gitignored)
- `docs/` — documentation
- `scripts/` — helper scripts (seed, migrate, lint)

---

### `src/` (application core)

src/
├── app.js # Express app bootstrap
├── config/ # Infra & environment config
│ ├── environment.js
│ ├── database.js
│ ├── redis.js
│ └── corsOptions.js
│
├── controllers/ # HTTP layer (thin)
├── routes/ # Express routes
├── services/ # Business logic
├── repositories/ # Data access layer
├── models/ # DB schemas
│
├── search/ # 🔍 Atlas Search pipelines
│ └── job.search.js
│
├── middlewares/ # Auth, error handling, uploads
├── validators/ # Request validation schemas
│
├── utils/ # Shared helpers
├── lib/ # AI prompts & helpers
├── agents/ # AI agents / orchestrators
│
├── queues/ # Queue producers
└── workers/ # Background workers

yaml
Copy code

---

## Key architecture principles

- **Controllers stay thin**
  Handle HTTP only. No DB or business logic.

- **Services orchestrate behavior**
  Apply rules, validations, and workflows.

- **Repositories isolate persistence**
  All DB queries live here (MongoDB, Atlas Search).

- **Search is a first-class citizen**
  Atlas Search pipelines live in `src/search/`, not in services or controllers.

- **Async work is offloaded**
  Emails, AI jobs, and heavy tasks run via queues/workers.

---

## MongoDB Atlas Search integration

This project uses **MongoDB Atlas Search (Apache Lucene)** instead of regex or basic text indexes.

### Why Atlas Search

- Indexed, high-performance search
- Autocomplete & typo tolerance
- Field-level relevance boosting
- No extra infrastructure (unlike Elasticsearch)

---

### Search index (Atlas dashboard)

Index name:
job_search

yaml
Copy code

Mapped fields:
- `title` → autocomplete (boosted)
- `skills` → text
- `description` → text

---

### Where search lives in code

src/search/job.search.js

markdown
Copy code

Responsibilities:
- Define `$search` aggregation pipelines
- Control scoring & relevance
- Keep search logic isolated and tunable

Repositories consume these pipelines and expose clean methods like:

```js
searchJobs({ query, limit })
API example
sql
Copy code
GET /api/jobs/search?q=react developer
Returns:

Ranked results

Lucene relevance score

Fast, indexed response even at scale

Quick start
Prerequisites
Node.js 18+

MongoDB Atlas cluster

Redis (optional, for queues)

Setup
Clone repository

Create .env from example

bash
Copy code
cp .env.example .env
Install dependencies

bash
Copy code
npm install
Run database seed/migrations (if applicable)

bash
Copy code
npm run seed
Start development server

bash
Copy code
npm run dev
Start background workers (if enabled)

bash
Copy code
npm run worker
Environment & configuration
All secrets live in .env

.env is gitignored

src/config/environment.js validates required vars at startup

App fails fast if config is invalid (CI-safe)

Development notes
Use repositories/ for all DB access

Never place Atlas Search logic inside controllers/services

Keep AI prompts versioned and isolated in lib/

Logs are centralized via utils/logger.js

Background tasks must go through queues

Contributing
Follow existing folder conventions

Keep controllers thin

Add validators for all external inputs

Update docs if behavior changes




# Recruitment-Server

An enterprise-grade backend service for recruitment and candidate management, featuring **MongoDB Atlas Search**, AI-powered interview tooling, background workers, and scalable architecture.

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Key architecture principles](#key-architecture-principles)
- [MongoDB Atlas Search integration](#mongodb-atlas-search-integration)
- [Quick start](#quick-start)
- [Environment & configuration](#environment--configuration)
- [Development notes](#development-notes)
- [Contributing](#contributing)

---

## Overview

This repository implements a **production-ready Node.js backend** built with Express and MongoDB Atlas.
It supports:

- Authentication & user management
- Job & application management
- **Lucene-powered search using MongoDB Atlas Search**
- AI-assisted interview workflows (question generation & evaluation)
- Background processing via queues and workers

The architecture follows **clean separation of concerns**, making it scalable, testable, and team-friendly.

---

## Tech stack

- **Runtime:** Node.js (18+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Search Engine:** MongoDB Atlas Search (Apache Lucene)
- **ORM/ODM:** Mongoose
- **Queues:** BullMQ / Redis
- **AI Layer:** Prompt + agent-based orchestration
- **Infra-ready:** AWS S3 (optional), Redis, CI-friendly env validation

---

## Project structure

### Root

- `README.md` — project overview & usage
- `package.json` — dependencies & scripts
- `server.js` — application entry point
- `.env.example` — environment variable template
- `logs/` — runtime logs (gitignored)
- `docs/` — documentation
- `scripts/` — helper scripts (seed, migrate, lint)

---

### `src/` (application core)

src/
├── app.js # Express app bootstrap
├── config/ # Infra & environment config
│ ├── environment.js
│ ├── database.js
│ ├── redis.js
│ └── corsOptions.js
│
├── controllers/ # HTTP layer (thin)
├── routes/ # Express routes
├── services/ # Business logic
├── repositories/ # Data access layer
├── models/ # DB schemas
│
├── search/ # 🔍 Atlas Search pipelines
│ └── job.search.js
│
├── middlewares/ # Auth, error handling, uploads
├── validators/ # Request validation schemas
│
├── utils/ # Shared helpers
├── lib/ # AI prompts & helpers
├── agents/ # AI agents / orchestrators
│
├── queues/ # Queue producers
└── workers/ # Background workers

yaml
Copy code

---

## Key architecture principles

- **Controllers stay thin**
  Handle HTTP only. No DB or business logic.

- **Services orchestrate behavior**
  Apply rules, validations, and workflows.

- **Repositories isolate persistence**
  All DB queries live here (MongoDB, Atlas Search).

- **Search is a first-class citizen**
  Atlas Search pipelines live in `src/search/`, not in services or controllers.

- **Async work is offloaded**
  Emails, AI jobs, and heavy tasks run via queues/workers.

---

## MongoDB Atlas Search integration

This project uses **MongoDB Atlas Search (Apache Lucene)** instead of regex or basic text indexes.

### Why Atlas Search

- Indexed, high-performance search
- Autocomplete & typo tolerance
- Field-level relevance boosting
- No extra infrastructure (unlike Elasticsearch)

---

### Search index (Atlas dashboard)

Index name:
job_search

yaml
Copy code

Mapped fields:
- `title` → autocomplete (boosted)
- `skills` → text
- `description` → text

---

### Where search lives in code

src/search/job.search.js

markdown
Copy code

Responsibilities:
- Define `$search` aggregation pipelines
- Control scoring & relevance
- Keep search logic isolated and tunable

Repositories consume these pipelines and expose clean methods like:

```js
searchJobs({ query, limit })
API example
sql
Copy code
GET /api/jobs/search?q=react developer
Returns:

Ranked results

Lucene relevance score

Fast, indexed response even at scale

Quick start
Prerequisites
Node.js 18+

MongoDB Atlas cluster

Redis (optional, for queues)

Setup
Clone repository

Create .env from example

bash
Copy code
cp .env.example .env
Install dependencies

bash
Copy code
npm install
Run database seed/migrations (if applicable)

bash
Copy code
npm run seed
Start development server

bash
Copy code
npm run dev
Start background workers (if enabled)

bash
Copy code
npm run worker
Environment & configuration
All secrets live in .env

.env is gitignored

src/config/environment.js validates required vars at startup

App fails fast if config is invalid (CI-safe)

Development notes
Use repositories/ for all DB access

Never place Atlas Search logic inside controllers/services

Keep AI prompts versioned and isolated in lib/

Logs are centralized via utils/logger.js

Background tasks must go through queues

Contributing
Follow existing folder conventions

Keep controllers thin

Add validators for all external inputs

Update docs if behavior changes