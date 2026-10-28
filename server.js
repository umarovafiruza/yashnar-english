const http = require('http');
const fs = require('fs');
const path = require('path');
const serverAi = require('./server-ai');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg'
};

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const urlParts = req.url.split('?');
  const reqPath = decodeURI(urlParts[0]);

  // --- API Routes ---
  if (reqPath.startsWith('/api/ai/')) {
    try {
      if (req.method === 'GET' && reqPath === '/api/ai/status') {
        const status = serverAi.getAIStatus();
        sendJson(res, 200, status);
        return;
      }

      if (req.method === 'POST') {
        const body = await readJsonBody(req);

        if (reqPath === '/api/ai/chat') {
          const result = await serverAi.handleSpeakingChat(body);
          sendJson(res, 200, result);
          return;
        }

        if (reqPath === '/api/ai/evaluate-writing') {
          const result = await serverAi.handleWritingEvaluation(body);
          sendJson(res, 200, result);
          return;
        }

        if (reqPath === '/api/ai/evaluate-speaking') {
          const result = await serverAi.handleSpeakingEvaluation(body);
          sendJson(res, 200, result);
          return;
        }
      }

      sendJson(res, 404, { error: 'API endpoint not found' });
      return;
    } catch (err) {
      console.error('API Error:', err);
      sendJson(res, 500, { error: 'Internal AI processing error', message: err.message });
      return;
    }
  }

  // --- Static File Serving ---
  let filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);

  // Security check: ensure path is within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
