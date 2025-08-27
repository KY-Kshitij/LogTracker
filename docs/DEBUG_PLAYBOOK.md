# Debug Playbook

## Server won't start
- Run: `pnpm --filter @api dev`
- Check: Port already in use? Env vars missing? Look at Pino logs.
- Fix: `lsof -ti:4000 | xargs kill -9` (kill process on port 4000)

## 400/422 validation errors
- Compare your request body with the Zod schema in the route.
- Tip: Log `safeParse` error to see which field failed.
- Example: `{ level: "error", message: "Oops" }` - check if `level` is enum value

## Mongo connection fails
- Check `MONGO_URI` in apps/api/.env
- Can you connect with `mongosh`? Is IP allowlist configured?
- Test: `mongosh "mongodb+srv://..." --eval "db.runCommand('ping')"`

## API key authentication fails
- Verify key format: `ls_` prefix, 32+ characters
- Check if key exists in database
- Test with: `http :4000/logs x-api-key:ls_your_key_here`

## Frontend can't connect to API
- Check `VITE_API_URL` in apps/web/.env
- Is API running on correct port?
- Test: `curl http://localhost:4000/health`

## Build fails
- Clear node_modules: `pnpm clean && pnpm install`
- Check TypeScript errors: `pnpm --filter @api build`
- Verify all dependencies in package.json

## Tests failing
- Run specific test: `pnpm --filter @api test -- --grep "health"`
- Check test environment variables
- Look for async/await issues in tests

## Rate limiting issues
- Check current limits: `RATE_LIMIT_INGEST=60` (requests per minute)
- Monitor with: `http :4000/logs` (should see 429 after 60 requests)
- Adjust limits in .env if needed

## Log ingestion not working
- Check request format matches Zod schema
- Verify API key is valid and not rate limited
- Look for validation errors in API logs
- Test with minimal payload: `{ level: "info", message: "test" }`

## Health endpoint returns error
- Check if server is running: `curl http://localhost:4000/health`
- Look for startup errors in Pino logs
- Verify PORT environment variable is set correctly
- Check if another process is using port 4000

## Express 5.x compatibility issues
- Downgrade to Express 4.x: `pnpm add express@^4.18.2`
- Update types: `pnpm add -D @types/express@^4.17.21`
- Check for path-to-regexp errors in logs

## CORS errors in browser
- Check CORS_ORIGIN in .env matches your frontend URL
- Verify CORS middleware is loaded before routes
- Test with: `curl -H "Origin: http://localhost:3000" http://localhost:4000/health`

## Pino logs not showing
- Check LOG_LEVEL in .env (default: 'info')
- Verify pino-pretty is installed for development
- Look for transport configuration errors

## File upload errors
- Check if API is running on port 4000: `curl http://localhost:4000/health`
- Verify file size is under 10MB limit
- Check browser console for CORS errors
- Test with: `curl -X POST -F "file=@test.txt" http://localhost:4000/upload`

## Dashboard not updating
- Check if API URL is correct (should be port 4000, not 3000)
- Verify `/data` endpoint returns real data: `curl http://localhost:4000/data`
- Check browser console for fetch errors
- Dashboard auto-refreshes every 30 seconds, or click "Refresh Data" button

## Dashboard showing random numbers
- This was fixed in Step 1.5 - dashboard now shows real file upload data
- If still seeing random numbers, check if API is returning mock data
- Verify `/data` endpoint is working: `curl http://localhost:4000/data`

## File upload working but dashboard not reflecting
- Check if files are being tracked: `curl http://localhost:4000/files`
- Verify dashboard is calling correct API endpoint
- Check browser network tab for failed requests
- Restart API server if in-memory data seems corrupted
