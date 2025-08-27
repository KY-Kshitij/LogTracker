# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### 2. Clone and Install
```bash
# Navigate to project directory
cd /home/kshitij/Downloads/Major\ project/project

# Install all dependencies
pnpm install
```

### 3. Start the Application
```bash
# Start both frontend and backend
pnpm dev
```

**Expected Output:**
```
• Packages in scope: api, server-log-management-system
• Running dev in 2 packages
🚀 LogSaaS Lite API running on http://localhost:4000
📊 Health check available at http://localhost:4000/health
VITE v4.5.14  ready in 160 ms
➜  Local:   http://localhost:5174/
```

### 4. Verify Everything is Working

#### Test API Health
```bash
curl http://localhost:4000/health
```
**Expected:** `{"ok":true,"version":"1.0.0",...}`

#### Test Dashboard Data
```bash
curl http://localhost:4000/data
```
**Expected:** `{"totalLogsToday":0,"successCount":0,...}`

#### Open Frontend
Open your browser to: **http://localhost:5174**

You should see the LogSaaS Lite dashboard!

## 📁 Project Structure

```
project/
├── apps/
│   ├── api/          # Backend API (Express + Node.js)
│   └── web/          # Frontend (React + TypeScript)
├── docs/             # Documentation (this folder)
└── packages/         # Shared configurations
```

## 🔧 Key Features Working

### ✅ File Upload
- Upload files up to 10MB
- Track file metadata
- View uploaded files list

### ✅ Dashboard
- Real-time metrics
- Auto-refresh every 30 seconds
- Manual refresh button

### ✅ API Endpoints
- `/health` - Server health check
- `/upload` - File upload
- `/data` - Dashboard metrics
- `/files` - List all files

## 🧪 Quick Testing

### Test File Upload
```bash
# Create a test file
echo "Hello World" > test.txt

# Upload it
curl -X POST -F "file=@test.txt" http://localhost:4000/upload
```

### Check Dashboard Updates
```bash
# View dashboard data
curl http://localhost:4000/data

# View all files
curl http://localhost:4000/files
```

### Test Frontend
1. Go to http://localhost:5174/file
2. Upload a file
3. Go to http://localhost:5174/dashboard
4. See the metrics update!

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Kill processes on ports
lsof -ti:4000 | xargs kill -9
lsof -ti:5174 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install
```

### API Not Responding
```bash
# Check if API is running
curl http://localhost:4000/health

# Check logs in terminal where pnpm dev is running
```

## 📚 Next Steps

### For New Developers
1. Read `docs/LEARN.md` - Beginner learning cards
2. Check `docs/API_REFERENCE.md` - Complete API documentation
3. Review `docs/COMMANDS.md` - All important commands

### For Development
1. Check `docs/CHANGES.md` - Recent changes and decisions
2. Review `docs/DEBUG_PLAYBOOK.md` - Common issues and fixes
3. See `docs/ROADMAP.md` - Future development plans

### For Production
1. Review `docs/ENV.md` - Environment configuration
2. Check `docs/ASK_KB.md` - Q&A knowledge base

## 🔗 Useful URLs

| Purpose | URL |
|---------|-----|
| Frontend | http://localhost:5174 |
| API Health | http://localhost:4000/health |
| API Info | http://localhost:4000/ |
| Dashboard Data | http://localhost:4000/data |
| File List | http://localhost:4000/files |
| File Upload Page | http://localhost:5174/file |

## 📞 Getting Help

### Check Documentation
- `docs/DEBUG_PLAYBOOK.md` - Common issues
- `docs/ASK_KB.md` - Q&A knowledge base
- `docs/COMMANDS.md` - All commands

### Check Logs
- API logs appear in the terminal where you ran `pnpm dev`
- Frontend logs appear in browser console (F12)

### Test Endpoints
```bash
# Quick health check
curl http://localhost:4000/health

# Check all endpoints
curl http://localhost:4000/
```

## 🎯 What's Working Now

- ✅ **File Upload System** - Upload and track files
- ✅ **Dashboard Analytics** - Real-time metrics
- ✅ **API Health Monitoring** - Server status
- ✅ **Frontend UI** - Complete React application
- ✅ **Auto-refresh** - Dashboard updates automatically
- ✅ **Error Handling** - Proper error messages
- ✅ **File Management** - List and access uploaded files

## 🚧 What's Coming Next

- 🔄 **Database Integration** - Persistent storage (Phase A Step 2)
- 🔐 **Authentication** - User login and API keys (Phase B)
- 📊 **Advanced Analytics** - Charts and reporting (Phase C)
- 🛡️ **Security Features** - Rate limiting and validation (Phase D)

---

**Need help?** Check the documentation in the `docs/` folder or refer to the debug playbook!
