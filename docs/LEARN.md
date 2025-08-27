# Learn by Doing (Beginner Cards)

## 🧩 What is an API server?
- 🧠 In simple words: A program that listens on a URL and responds to requests.
- 🔧 Example: `GET /health` → `{ ok: true }`
- ⏱️ Use when: You want your frontend/clients to fetch data or send events.

## 🔐 What is an API key (hashed)?
- 🧠 A secret token that identifies the sender. We store only its hash for safety.
- 🔧 Example: Client sends header `x-api-key: ls_...`
- ⏱️ Use when: Allowing ingestion from servers/services without user login.

## 🧪 What is validation (Zod)?
- 🧠 Auto-checks that incoming data has the right shape (types).
- 🔧 Example: `{ level: "error", message: "Oops" }` must match the schema.
- ⏱️ Use when: Any request body or query can be malformed.

## 📊 What is time-series data?
- 🧠 Data organized by time (like logs with timestamps).
- 🔧 Example: `{ timestamp: "2025-01-27T15:30:00Z", level: "error" }`
- ⏱️ Use when: You need to query "logs from last 5 minutes" efficiently.

## 🚀 What is a monorepo?
- 🧠 Multiple apps in one repository (like our API + web frontend).
- 🔧 Example: `apps/api/` and `apps/web/` share the same git history.
- ⏱️ Use when: Related projects need to evolve together.

## 🔄 What is CI/CD?
- 🧠 Automatically test and deploy code when you push changes.
- 🔧 Example: Push to main → tests run → deploy to production.
- ⏱️ Use when: You want reliable, repeatable deployments.

## 🏥 What is a health check endpoint?
- 🧠 An endpoint that tells you if the service is running properly.
- 🔧 Example: `GET /health` → `{ ok: true, uptime: 7.82, version: "1.0.0" }`
- ⏱️ Use when: Monitoring systems need to know if your API is alive.

## 🛡️ What is Helmet middleware?
- 🧠 Adds security headers to prevent common web vulnerabilities.
- 🔧 Example: Sets `X-Frame-Options`, `X-Content-Type-Options`, etc.
- ⏱️ Use when: You want to protect your API from common attacks.

## 📝 What is Pino logging?
- 🧠 Fast, structured logging that's easy to parse and analyze.
- 🔧 Example: `{"level":30,"time":1640995200000,"msg":"Server started"}`
- ⏱️ Use when: You need to debug issues or monitor application behavior.

## 🌐 What is CORS?
- 🧠 Allows web browsers to make requests to different domains.
- 🔧 Example: Frontend on localhost:3000 can call API on localhost:4000.
- ⏱️ Use when: Your frontend and API are on different domains/ports.

## 📁 What is file upload tracking?
- 🧠 Storing metadata about uploaded files for analytics and management.
- 🔧 Example: Track file name, size, type, upload time for dashboard metrics.
- ⏱️ Use when: You need to show users what they've uploaded and provide analytics.

## 🔄 What is real-time dashboard data?
- 🧠 Dashboard metrics that update automatically based on actual user actions.
- 🔧 Example: File upload count increases when user uploads a file.
- ⏱️ Use when: Users expect to see their actions reflected immediately in the UI.

## 💾 What is in-memory vs persistent storage?
- 🧠 In-memory: Data stored in RAM (lost on restart). Persistent: Data stored on disk/database.
- 🔧 Example: Current file tracking is in-memory, will move to MongoDB for persistence.
- ⏱️ Use when: Prototyping vs production (in-memory for dev, persistent for prod).

## 🔄 What is auto-refresh vs manual refresh?
- 🧠 Auto-refresh: UI updates automatically. Manual: User clicks button to update.
- 🔧 Example: Dashboard refreshes every 30 seconds + user can click "Refresh Data".
- ⏱️ Use when: You want both convenience (auto) and control (manual) for users.
