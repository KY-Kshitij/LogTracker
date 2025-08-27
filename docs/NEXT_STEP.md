# Next Step
Phase A · Step 2 — Database models & indexes (Tenants, Projects, ApiKeys, Logs).

**Goal:** MongoDB connection with time-series logs collection and proper indexes.

**Do this next:**  
1) Add MongoDB connection with Mongoose.  
2) Create models: Tenants, Projects, ApiKeys (hashed), Logs (time-series).  
3) Add indexes for tenant isolation and time-based queries.  
4) Create seed script with sample data.  
5) Update CHANGES.md + PROGRESS.json + LEARN.md + ASK_KB.md + DEBUG_PLAYBOOK.md.

**Verification commands:**
```bash
pnpm --filter @api dev
# Check MongoDB connection in logs
# Run seed script to create sample data
```

**Expected output:**
- API connects to MongoDB successfully
- Seed script creates tenant + project + sample logs
- Indexes are created for efficient queries
