import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import pino from 'pino';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Initialize logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
});

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// In-memory storage for uploaded files (in production, this would be in MongoDB)
let uploadedFiles = [];
let uploadStats = {
  totalFiles: 0,
  totalSize: 0,
  lastUpload: null,
  fileTypes: {}
};

// Configure multer for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types for now
    cb(null, true);
  }
});

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const version = process.env.npm_package_version || '1.0.0';
  
  res.json({
    ok: true,
    version,
    uptime: Math.round(uptime * 100) / 100,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'LogSaaS Lite API',
    version: process.env.npm_package_version || '1.0.0',
    status: 'healthy',
    endpoints: {
      health: '/health',
      upload: '/upload',
      data: '/data',
      files: '/files',
      docs: '/docs (coming soon)'
    }
  });
});

// Dashboard data endpoint
app.get('/data', (req, res) => {
  try {
    // Real dashboard data based on uploaded files
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filesUploadedToday = uploadedFiles.filter(file => {
      const uploadDate = new Date(file.uploadedAt);
      uploadDate.setHours(0, 0, 0, 0);
      return uploadDate.getTime() === today.getTime();
    });

    const dashboardData = {
      totalLogsToday: filesUploadedToday.length,
      successCount: uploadStats.totalFiles,
      activeServers: 1, // Single server for now
      activeAlerts: Object.keys(uploadStats.fileTypes).length,
    };

    logger.info({
      dashboardDataRequested: {
        timestamp: new Date().toISOString(),
        data: dashboardData,
        totalFiles: uploadStats.totalFiles,
        filesUploadedToday: filesUploadedToday.length
      }
    });

    res.json(dashboardData);
  } catch (error) {
    logger.error({
      dashboardDataError: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'Failed to fetch dashboard data',
      message: 'Internal server error'
    });
  }
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please select a file to upload'
      });
    }

    // Track uploaded file
    const fileData = {
      id: Date.now() + Math.random(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedAt: new Date().toISOString()
    };

    uploadedFiles.push(fileData);

    // Update upload statistics
    uploadStats.totalFiles += 1;
    uploadStats.totalSize += req.file.size;
    uploadStats.lastUpload = new Date().toISOString();
    
    // Track file types
    const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase() || 'unknown';
    uploadStats.fileTypes[fileExtension] = (uploadStats.fileTypes[fileExtension] || 0) + 1;

    logger.info({
      fileUploaded: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        totalFiles: uploadStats.totalFiles,
        totalSize: uploadStats.totalSize
      }
    });

    res.json({
      message: 'File uploaded successfully',
      file: fileData
    });
  } catch (error) {
    logger.error({
      uploadError: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'Upload failed',
      message: 'Failed to upload file'
    });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Get all uploaded files
app.get('/files', (req, res) => {
  try {
    res.json({
      files: uploadedFiles,
      stats: uploadStats
    });
  } catch (error) {
    logger.error({
      filesListError: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'Failed to fetch files list',
      message: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Start server
app.listen(port, () => {
  logger.info(`🚀 LogSaaS Lite API running on http://localhost:${port}`);
  logger.info(`📊 Health check available at http://localhost:${port}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
