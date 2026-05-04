const { io } = require('socket.io-client');

const socket = io(process.env["logger_server"], {
  reconnection: true,
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log(`\x1b[36m✅ Connected to log server: ${process.pid}\x1b[0m`);
});

socket.on('disconnect', () => {
  console.log(`\x1b[93m❌ Disconnected from log server: ${process.pid}\x1b[0m`);
});

const sendLog = (level, message, meta = {}) => {
  socket.emit('log', {
    level,
    message,
    meta,
    timestamp: new Date()
  });
};

module.exports = sendLog;
