// Middleware functions for the API
// TODO: Add authentication, logging, error handling middlewares

const authMiddleware = (req, res, next) => {
  // TODO: Implement authentication middleware
  next();
};

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

module.exports = {
  authMiddleware,
  loggingMiddleware,
  errorHandler
};
