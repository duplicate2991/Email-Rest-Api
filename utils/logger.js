const { createLogger, format, transports } = require('winston');
const sendLog = require('./socketLogger');

const logger = createLogger({
  level: 'info',

  format: format.combine(
    format.timestamp(),

    // 🔥 YAHAN MAGIC HAI
    format((info) => {
      try {
        sendLog(info.level, info.message, info.meta || {});
      } catch (err) {
        console.error('Socket log failed:', err.message);
      }
      return info;
    })(),

    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),

  transports: [
    new transports.Console()
  ]
});

module.exports = logger;
