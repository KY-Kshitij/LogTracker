const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });
}

module.exports = { log };