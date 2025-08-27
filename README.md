# LogTracker - Modern Logging Platform

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **A modern, real-time logging platform with advanced monitoring, alerting, and analytics dashboard.**

LogTracker is a comprehensive SaaS-style logging solution that provides real-time log ingestion, monitoring, alerting, and analytics. Built with modern technologies including React, Node.js, TypeScript, and Firebase.

## ✨ Key Features

- 🔐 **Multi-tenant Authentication** - Firebase-based user management
- 📊 **Real-time Dashboard** - Live charts and metrics visualization
- 🚨 **Smart Alerting** - Configurable alert rules with email/Slack integration
- 🔍 **Advanced Log Search** - Powerful filtering and search capabilities
- 📈 **Analytics & Insights** - Error trends, geographic distribution, resource usage
- 🌙 **Dark/Light Mode** - Beautiful UI with theme switching
- 🔑 **API Key Management** - Secure log ingestion endpoints
- 📱 **Responsive Design** - Works on desktop and mobile devices

> 📚 **Documentation**: All project docs live in `/docs` - see [CHANGES.md](docs/CHANGES.md) for latest updates and [NEXT_STEP.md](docs/NEXT_STEP.md) for what to do next.

## 📂 Project Structure

```
logTracker/
 ├─ apps/
 │   ├─ api/   # backend (Node + Express + MongoDB)
 │   │   └─ src/
 │   │       ├─ config/     # database config, env vars
 │   │       ├─ models/     # database models
 │   │       ├─ routes/     # API routes
 │   │       ├─ middlewares/ # auth, logging, error handling
 │   │       ├─ services/   # business logic layer
 │   │       ├─ workers/    # background jobs
 │   │       ├─ utils/      # helper functions
 │   │       └─ index.js    # server entry point
 │   └─ web/   # frontend (React + Vite + TypeScript)
 │       ├─ public/
 │       └─ src/
 │           ├─ pages/      # route components
 │           ├─ components/ # reusable UI components
 │           ├─ hooks/      # custom React hooks
 │           ├─ theme/      # dark/light mode + shadcn/ui
 │           ├─ context/    # React context providers
 │           ├─ layouts/    # page layouts
 │           ├─ services/   # API services
 │           └─ types/      # TypeScript type definitions
 ├─ packages/
 │   └─ config/ # shared tsconfig, eslint, etc.
 ├─ pnpm-workspace.yaml
 ├─ turbo.json
 ├─ CONTEXT.md # full system context and workflows
 └─ README.md  # this file
```

## 🚀 Features
- Multi-tenant user authentication (Firebase / JWT)
- API key management
- Log ingestion endpoint
- Dashboard UI with charts + filters
- Dark/light mode support
- Alerting rules + worker (email/slack integration)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB (for backend)

### Installation
```bash
# Install dependencies for all packages
pnpm install

# Or install individually
cd apps/api && pnpm install
cd apps/web && pnpm install
```

## Commands to Run the Website

### Option 1: Run Both Frontend and Backend Together (Recommended)
From the project root directory (`/home/kshitij/Downloads/Major project/project`):

```bash
# First, kill any existing processes on port 4000
lsof -ti:4000 | xargs kill -9

# Then start both frontend and backend
pnpm dev
```

This will start:
- **Backend API** on `http://localhost:4000`
- **Frontend** on `http://localhost:5174` (or another available port)

### Option 2: Run Frontend Only (if you just want to see the UI)
From the web directory (`/home/kshitij/Downloads/Major project/project/apps/web`):

```bash
pnpm dev
```

### Option 3: Run Backend Only (if you need the API)
From the API directory (`/home/kshitij/Downloads/Major project/project/apps/api`):

```bash
pnpm dev
```

## What You'll See

Once running, you can access:

1. **Frontend Website**: `http://localhost:5174/` (or the port shown in the terminal)
   - Login/Register pages
   - Dashboard with charts
   - Log Explorer
   - Alerts management
   - Analytics
   - Settings

2. **Backend API**: `http://localhost:4000/health`
   - Health check endpoint
   - API documentation (coming soon)

## Troubleshooting

If you get port conflicts:

```bash
# Kill processes on specific ports
lsof -ti:4000 | xargs kill -9  # For API
lsof -ti:5173 | xargs kill -9  # For frontend
```

## Current Project Status

Based on the documentation I read:
- ✅ **Frontend**: Complete React app with authentication, dashboard, charts
- ✅ **Backend**: Health endpoint working (Phase A, Step 1)
- 🔄 **Next Step**: Database models and MongoDB connection (Phase A, Step 2)

The frontend is fully functional and will show a complete logging platform interface, even though the backend is still in early development stages.

**Try running `pnpm dev` from the project root directory first!**

## 📦 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, pino
- **Frontend**: React, TypeScript, Vite, TailwindCSS, shadcn/ui, Chart.js
- **Auth**: Firebase / JWT
- **DevOps**: Docker-ready, pnpm monorepo, turborepo

## 🏗️ Architecture

### Backend Structure
- **config/**: Database configuration, environment variables
- **models/**: Mongoose schemas and models
- **routes/**: Express route handlers
- **middlewares/**: Authentication, logging, error handling
- **services/**: Business logic layer
- **workers/**: Background job processing
- **utils/**: Helper functions and utilities

### Frontend Structure
- **pages/**: Route components and page layouts
- **components/**: Reusable UI components
- **hooks/**: Custom React hooks for API calls
- **theme/**: Dark/light mode and shadcn/ui configuration
- **context/**: React context providers
- **layouts/**: Page layout components
- **services/**: API service functions
- **types/**: TypeScript type definitions

## 👥 Team Workflow
- Use `CONTEXT.md` as the source of truth
- Each teammate picks items from the backlog
- Commit frequently with clear messages
- Follow the monorepo structure for new features

## 🔧 Configuration

### Environment Variables
Create `.env` files in each app directory:

**apps/api/.env**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/logsaas
JWT_SECRET=your-jwt-secret
```

**apps/web/.env**
```env
VITE_API_URL=http://localhost:4000
VITE_FIREBASE_CONFIG=your-firebase-config
```

---
Happy building! 🚀

