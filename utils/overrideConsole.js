const sendLog = require('./socketLogger');

['log', 'error', 'warn', 'info'].forEach((method) => {
  const original = console[method];

  console[method] = (...args) => {
    original(...args);

    sendLog(method, args.join(' '));
  };
});
