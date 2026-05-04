const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/v1');
const errorHandler = require('./middlewares/error.middleware');
const rateLimiter = require('./middlewares/rateLimit.middleware');

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimiter);

app.use('/api/v1', routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// error handler
app.use(errorHandler);

module.exports = app;
