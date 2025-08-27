# Commands Debug Reference

This file contains all verification commands, their explanations, and debugging recipes for each step.

## Phase A · Step 1 — API Scaffold + /health

### Commands Reference

1) `pnpm --filter @api dev`
   - Why used: Start the API server in development mode with hot reload
   - What it does: Runs Express API with nodemon watching for file changes

2) `curl http://localhost:4000/health`
   - Why used: Test if the API server is responding and healthy
   - What it does: Sends a GET request to /health and shows the JSON response

3) `curl http://localhost:4000/`
   - Why used: Test the root endpoint to verify API is working
   - What it does: Sends a GET request to root and shows API info

4) `cat docs/PROGRESS.json`
   - Why used: Check current project status and next step
   - What it does: Shows machine-readable progress tracking

5) `lsof -ti:4000`
   - Why used: Check if port 4000 is already in use
   - What it does: Lists process IDs using port 4000

6) `kill <PID>`
   - Why used: Stop a process that's blocking port 4000
   - What it does: Terminates the specified process ID

7) `cat .env`
   - Why used: Check environment variables configuration
   - What it does: Shows current environment settings

8) `sed -i 's/PORT=3000/PORT=4000/' .env`
   - Why used: Fix port configuration in environment file
   - What it does: Replaces PORT=3000 with PORT=4000 in .env file

### Failure Playbook

#### Issue: Port 3000 in use, server won't start
- **Symptoms**: `Error: listen EADDRINUSE: address already in use :::3000`
- **Likely Causes**: 
  1. Old .env file has PORT=3000
  2. Another process is using port 3000
  3. Previous server instance still running
- **Quick Fix**: 
  ```bash
  # Check what's using port 3000
  lsof -ti:3000
  
  # Kill the process
  kill <PID>
  
  # Or fix .env file
  sed -i 's/PORT=3000/PORT=4000/' .env
  ```
- **Validation**: 
  ```bash
  pnpm dev
  curl http://localhost:4000/health
  ```

#### Issue: Express 5.x compatibility errors
- **Symptoms**: `TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError`
- **Likely Causes**: 
  1. Express 5.x has breaking changes
  2. Node.js 18 compatibility issues
  3. path-to-regexp version conflicts
- **Quick Fix**: 
  ```bash
  # Downgrade to Express 4.x
  pnpm add express@^4.18.2
  pnpm add -D @types/express@^4.17.21
  ```
- **Validation**: 
  ```bash
  pnpm dev
  curl http://localhost:4000/health
  ```

#### Issue: TypeScript loader errors
- **Symptoms**: `Error: tsx must be loaded with --import instead of --loader`
- **Likely Causes**: 
  1. Node.js 18 doesn't support new loader syntax
  2. tsx version incompatibility
  3. ESM loader configuration issues
- **Quick Fix**: 
  ```bash
  # Switch to JavaScript temporarily
  # Update package.json dev script to: "nodemon src/index.js"
  ```
- **Validation**: 
  ```bash
  pnpm dev
  curl http://localhost:4000/health
  ```

### Success Validation
- ✅ Server starts: `pnpm dev` shows "🚀 LogSaaS Lite API running on http://localhost:4000"
- ✅ Health endpoint: `curl http://localhost:4000/health` returns `{"ok":true,"version":"1.0.0",...}`
- ✅ Root endpoint: `curl http://localhost:4000/` returns API info
- ✅ Documentation: All docs updated and current
