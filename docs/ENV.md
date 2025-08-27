# Environment Variables (safe examples)

## API Environment (apps/api/.env)
```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/logsaas?retryWrites=true&w=majority

# Server
PORT=4000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key-here
API_KEY_SALT=your-api-key-salt-for-hashing

# Rate Limiting
RATE_LIMIT_INGEST=60
RATE_LIMIT_WINDOW=60000

# Firebase (for web UI auth)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# Logging
LOG_LEVEL=info
```

## Web Environment (apps/web/.env)
```bash
# API Connection
VITE_API_URL=http://localhost:4000

# Firebase (for frontend auth)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# App Configuration
VITE_APP_NAME=LogSaaS Lite
VITE_APP_VERSION=1.0.0
```

## Production Overrides
```bash
# API Production
NODE_ENV=production
PORT=8080
LOG_LEVEL=warn
RATE_LIMIT_INGEST=1000

# Web Production
VITE_API_URL=https://your-api.render.com
```

## Development Tips
- Never commit `.env` files to git
- Use `.env.example` as template
- Test with different environments
- Rotate secrets regularly
- Use strong, unique passwords
