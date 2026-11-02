/**
 * VERCEL SERVERLESS FUNCTION ENTRYPOINT
 * Forwards API requests directly to the core application server.
 */

const server = require('../server.js');

module.exports = (req, res) => {
  server.emit('request', req, res);
};
