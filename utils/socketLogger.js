const { io } = require('socket.io-client');

const socket = io(process.env["logger_server"], {
  reconnection: true,
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log(`✅ Connected to log server: ${process.pid}`);
});

socket.on('disconnect', () => {
  console.log(`❌ Disconnected from log server: ${process.pid}`);
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
