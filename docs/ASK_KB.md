# Ask Mode Knowledge Base

Q: Why are we using time-series collection for logs?  
A: It optimizes writes & time-window queries. Simpler indexing for latest N minutes. 🕒

Q: Why hash API keys?  
A: If DB leaks, raw keys must stay secret. Hashing prevents immediate misuse. 🔒

Q: How do I quickly test ingestion?  
A: Use httpie: `http :4000/logs x-api-key:ls_... level==error message=='404'` ⚙️

Q: What's the difference between development and production?  
A: Dev: localhost, debug logs, hot reload. Prod: real domain, minimal logs, optimized build. 🏭

Q: How do I add a new API endpoint?  
A: 1) Create route in apps/api/src/routes/, 2) Add validation with Zod, 3) Test with httpie, 4) Update docs. ➕

Q: What's the project structure?  
A: apps/api (backend), apps/web (frontend), packages/ (shared), docs/ (documentation). 📁

Q: How do I run the entire project?  
A: `pnpm dev` (runs both API and web), or `pnpm api:dev` / `pnpm web:dev` separately. 🚀

Q: What's the deployment strategy?  
A: API → Render (serverless), Web → Vercel (static), DB → MongoDB Atlas (managed). ☁️

Q: How do I debug a failing test?  
A: Check DEBUG_PLAYBOOK.md, run `pnpm test --verbose`, look at Pino logs. 🐛

Q: What's the authentication flow?  
A: API keys for ingestion, Firebase Auth for web UI, JWT tokens for API access. 🔑

Q: How do I check if the API is healthy?  
A: `curl http://localhost:4000/health` - returns uptime, version, and status. 🏥

Q: Why use Express 4.x instead of 5.x?  
A: Better Node.js 18 compatibility and fewer dependency conflicts. Express 5.x has breaking changes. 🔧

Q: What security headers does Helmet add?  
A: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, and more to prevent common attacks. 🛡️

Q: How do I see API logs?  
A: Pino logs appear in the terminal when running `pnpm dev`. They're structured JSON for easy parsing. 📝

Q: Why does dashboard show random numbers?  
A: This was fixed in Step 1.5. Dashboard now shows real file upload data. Check `/data` endpoint if still seeing random numbers. 📊

Q: How do I test file upload?  
A: Use curl: `curl -X POST -F "file=@test.txt" http://localhost:4000/upload` or use the web interface at `/file`. 📁

Q: Where are uploaded files stored?  
A: Files are stored in `apps/api/uploads/` directory. Metadata is tracked in memory (will be in MongoDB in Step 2). 💾

Q: How do I view all uploaded files?  
A: Call `GET /files` endpoint: `curl http://localhost:4000/files` to see all files and statistics. 📋

Q: Why does data reset when I restart the server?  
A: Currently using in-memory storage. Data persistence will be added with MongoDB in Phase A Step 2. 🔄

Q: How often does dashboard refresh?  
A: Dashboard auto-refreshes every 30 seconds. You can also click "Refresh Data" button for immediate updates. ⏰
