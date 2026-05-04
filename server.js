require('./utils/overrideConsole');
const cluster = require('cluster');
const os = require('os');
const process = require('process');

const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

// ===== GLOBAL CRASH HANDLERS =====
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// ===== CLUSTER MODE =====
if (cluster.isPrimary) {
  logger.info(`\x1b[92m🚀 Primary process ${process.pid} is running\x1b[0m`);
  logger.info(`\x1b[96m🏁 Starting ${numCPUs} workers...\x1b[0m`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.error(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // ===== WORKER PROCESS =====
  const server = app.listen(PORT, () => {
    logger.info(`Worker ${process.pid} started on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
  });

  // ===== GRACEFUL SHUTDOWN =====
  const shutdown = (signal) => {
    logger.info(`Worker ${process.pid} received ${signal}. Shutting down...`);

    server.close(() => {
      logger.info(`Worker ${process.pid} closed all connections`);
      process.exit(0);
    });

    // Force shutdown after timeout
    setTimeout(() => {
      logger.error(`Forcefully shutting down worker ${process.pid}`);
      process.exit(1);
    }, 5000);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
