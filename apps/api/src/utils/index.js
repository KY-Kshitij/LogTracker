// Utility functions for the API
// TODO: Add helper functions, validators, etc.


const logger = {
  info: (message, data = {}) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  }
};

const validator = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidLogLevel: (level) => {
    const validLevels = ['debug', 'info', 'warn', 'error'];
    return validLevels.includes(level);
  }
};

const dateUtils = {
  formatDate: (date) => {
    return new Date(date).toISOString();
  },
  
  getDateRange: (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    return { start, end };
  }
};

module.exports = {
  logger,
  validator,
  dateUtils
};
