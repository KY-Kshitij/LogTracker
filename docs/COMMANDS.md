# Important Commands Reference

## 🚀 Starting the Application

### Start Both Frontend and Backend
```bash
# From project root
pnpm dev
```
**What it does:** Starts both API (port 4000) and web (port 5174) servers
**Expected output:** Both servers running with health checks available

### Start Only Frontend
```bash
# From apps/web directory
cd apps/web
pnpm dev
```
**What it does:** Starts only the React frontend
**Expected output:** Vite dev server on http://localhost:5174

### Start Only Backend
```bash
# From apps/api directory
cd apps/api
pnpm dev
```
**What it does:** Starts only the Express API server
**Expected output:** API server on http://localhost:4000

## 🔧 Development Commands

### Install Dependencies
```bash
# Install all dependencies (root + all apps)
pnpm install

# Install only API dependencies
cd apps/api && pnpm install

# Install only web dependencies
cd apps/web && pnpm install
```

### Build Commands
```bash
# Build all packages
pnpm build

# Build only API
pnpm --filter @api build

# Build only web
pnpm --filter @web build
```

### Linting
```bash
# Lint all packages
pnpm lint

# Lint only API
pnpm --filter @api lint

# Lint only web
pnpm --filter @web lint
```

## 🧪 Testing Commands

### API Testing
```bash
# Test API health endpoint
curl http://localhost:4000/health

# Test API root endpoint
curl http://localhost:4000/

# Test dashboard data endpoint
curl http://localhost:4000/data

# Test file upload endpoint
curl -X POST -F "file=@test.txt" http://localhost:4000/upload

# View all uploaded files
curl http://localhost:4000/files
```

### Frontend Testing
```bash
# Test frontend is running
curl http://localhost:5174

# Open in browser
open http://localhost:5174
# or
xdg-open http://localhost:5174  # Linux
```

## 🐛 Debugging Commands

### Port Management
```bash
# Kill process on port 4000 (API)
lsof -ti:4000 | xargs kill -9

# Kill process on port 5174 (Frontend)
lsof -ti:5174 | xargs kill -9

# Check what's running on ports
lsof -i :4000
lsof -i :5174
```

### Logs and Monitoring
```bash
# View API logs (in terminal where pnpm dev is running)
# Logs appear automatically with Pino

# Check if API is responding
curl -v http://localhost:4000/health

# Test CORS
curl -H "Origin: http://localhost:5174" http://localhost:4000/health
```

### File System
```bash
# View uploaded files
ls -la apps/api/uploads/

# Check file permissions
chmod 755 apps/api/uploads/

# Clear uploaded files (if needed)
rm -rf apps/api/uploads/*
```

## 🔍 Environment Setup

### Environment Files
```bash
# Check if .env files exist
ls -la apps/api/.env
ls -la apps/web/.env

# Create .env files if missing
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### Database (Future - Phase A Step 2)
```bash
# Test MongoDB connection (when implemented)
mongosh "mongodb://localhost:27017/logsaas"

# Check MongoDB status
sudo systemctl status mongod
```

## 📊 Monitoring Commands

### API Endpoints Status
```bash
# Health check
curl http://localhost:4000/health

# API info
curl http://localhost:4000/

# Dashboard data
curl http://localhost:4000/data

# File list
curl http://localhost:4000/files
```

### Performance Testing
```bash
# Test file upload performance
time curl -X POST -F "file=@large-file.txt" http://localhost:4000/upload

# Test concurrent uploads
for i in {1..5}; do curl -X POST -F "file=@test$i.txt" http://localhost:4000/upload & done
```

## 🚨 Emergency Commands

### Force Stop Everything
```bash
# Kill all Node.js processes
pkill -f node

# Kill all processes on project ports
lsof -ti:4000,5174 | xargs kill -9
```

### Reset Everything
```bash
# Clear all node_modules and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install

# Clear all build artifacts
rm -rf apps/*/dist apps/*/build
```

### Database Reset (Future)
```bash
# Reset MongoDB (when implemented)
mongosh "mongodb://localhost:27017/logsaas" --eval "db.dropDatabase()"
```

## 📝 Common Workflows

### Daily Development
```bash
# 1. Start the application
pnpm dev

# 2. Test API health
curl http://localhost:4000/health

# 3. Open frontend
open http://localhost:5174

# 4. Upload a test file
curl -X POST -F "file=@test.txt" http://localhost:4000/upload

# 5. Check dashboard data
curl http://localhost:4000/data
```

### Debugging Issues
```bash
# 1. Check if servers are running
lsof -i :4000
lsof -i :5174

# 2. Test API endpoints
curl http://localhost:4000/health
curl http://localhost:4000/data

# 3. Check logs in terminal
# (Look at the terminal where pnpm dev is running)

# 4. Check browser console
# (Open browser dev tools)
```

### File Upload Testing
```bash
# 1. Create test file
echo "test content" > test.txt

# 2. Upload file
curl -X POST -F "file=@test.txt" http://localhost:4000/upload

# 3. Check if file was tracked
curl http://localhost:4000/files

# 4. Check dashboard updated
curl http://localhost:4000/data
```

## 🔗 Useful URLs

### Development URLs
- **Frontend:** http://localhost:5174
- **API Health:** http://localhost:4000/health
- **API Root:** http://localhost:4000/
- **Dashboard Data:** http://localhost:4000/data
- **File List:** http://localhost:4000/files
- **Uploaded Files:** http://localhost:4000/uploads/

### Frontend Pages
- **Dashboard:** http://localhost:5174/dashboard
- **File Upload:** http://localhost:5174/file
- **Log Explorer:** http://localhost:5174/logs
- **Alerts:** http://localhost:5174/alerts
- **Analytics:** http://localhost:5174/analytics
- **Settings:** http://localhost:5174/settings
