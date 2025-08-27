# API Reference

## Base URL
```
http://localhost:4000
```

## Authentication
Currently, no authentication is required for development. API key authentication will be added in Phase B.

## Endpoints

### Health Check
**GET** `/health`

Returns the health status of the API server.

**Response:**
```json
{
  "ok": true,
  "version": "1.0.0",
  "uptime": 123.45,
  "timestamp": "2025-01-27T16:30:00.000Z",
  "environment": "development"
}
```

**Example:**
```bash
curl http://localhost:4000/health
```

---

### API Information
**GET** `/`

Returns information about the API and available endpoints.

**Response:**
```json
{
  "message": "LogSaaS Lite API",
  "version": "1.0.0",
  "status": "healthy",
  "endpoints": {
    "health": "/health",
    "upload": "/upload",
    "data": "/data",
    "files": "/files",
    "docs": "/docs (coming soon)"
  }
}
```

**Example:**
```bash
curl http://localhost:4000/
```

---

### Dashboard Data
**GET** `/data`

Returns real-time dashboard metrics based on uploaded files.

**Response:**
```json
{
  "totalLogsToday": 5,
  "successCount": 12,
  "activeServers": 1,
  "activeAlerts": 3
}
```

**Field Descriptions:**
- `totalLogsToday`: Number of files uploaded today
- `successCount`: Total number of files uploaded
- `activeServers`: Number of active servers (currently 1)
- `activeAlerts`: Number of different file types uploaded

**Example:**
```bash
curl http://localhost:4000/data
```

---

### File Upload
**POST** `/upload`

Upload a file to the server.

**Content-Type:** `multipart/form-data`

**Parameters:**
- `file` (required): The file to upload (max 10MB)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "id": 1706365800123.456,
    "originalName": "example.txt",
    "filename": "file-1706365800123-123456789.txt",
    "size": 1024,
    "mimetype": "text/plain",
    "fileUrl": "/uploads/file-1706365800123-123456789.txt",
    "uploadedAt": "2025-01-27T16:30:00.123Z"
  }
}
```

**Example:**
```bash
curl -X POST -F "file=@example.txt" http://localhost:4000/upload
```

**Error Responses:**
```json
{
  "error": "No file uploaded",
  "message": "Please select a file to upload"
}
```

```json
{
  "error": "Upload failed",
  "message": "Failed to upload file"
}
```

---

### List Uploaded Files
**GET** `/files`

Returns a list of all uploaded files and upload statistics.

**Response:**
```json
{
  "files": [
    {
      "id": 1706365800123.456,
      "originalName": "example.txt",
      "filename": "file-1706365800123-123456789.txt",
      "size": 1024,
      "mimetype": "text/plain",
      "fileUrl": "/uploads/file-1706365800123-123456789.txt",
      "uploadedAt": "2025-01-27T16:30:00.123Z"
    }
  ],
  "stats": {
    "totalFiles": 12,
    "totalSize": 1048576,
    "lastUpload": "2025-01-27T16:30:00.123Z",
    "fileTypes": {
      "txt": 5,
      "pdf": 3,
      "jpg": 2,
      "har": 2
    }
  }
}
```

**Example:**
```bash
curl http://localhost:4000/files
```

---

### Access Uploaded Files
**GET** `/uploads/{filename}`

Access a specific uploaded file.

**Parameters:**
- `filename`: The filename returned in the upload response

**Example:**
```bash
curl http://localhost:4000/uploads/file-1706365800123-123456789.txt
```

---

## Error Responses

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Route GET /nonexistent not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting
Currently, no rate limiting is implemented. This will be added in Phase D.

## File Size Limits
- Maximum file size: 10MB
- Supported file types: All (no restrictions currently)

## Data Persistence
- Files are stored in `apps/api/uploads/` directory
- File metadata is stored in memory (lost on server restart)
- Database persistence will be added in Phase A Step 2

## CORS Configuration
- Origin: `http://localhost:5173` (frontend)
- Credentials: enabled
- Methods: GET, POST, PUT, DELETE, OPTIONS

## Logging
All API requests are logged using Pino with the following information:
- HTTP method
- URL
- User agent
- IP address
- Response time

## Development Notes
- Server runs on port 4000
- Auto-restart on file changes (nodemon)
- Pretty-printed logs in development
- CORS enabled for frontend integration
