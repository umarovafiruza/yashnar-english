/**
 * YASHNAR ENGLISH - SECURE FULL-STACK APPLICATION SERVER
 * Serves Public Landing, Auth Pages, Protected App, and AI APIs
 * Node.js Native HTTP Server with Strict Path Guarantees & Cookie Sessions
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const serverAi = require('./server-ai');
const serverAuth = require('./server-auth');

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

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...extraHeaders
  });
  res.end(JSON.stringify(data));
}

function sendRedirect(res, location, cookieStr = null) {
  const headers = { 'Location': location };
  if (cookieStr) headers['Set-Cookie'] = cookieStr;
  res.writeHead(302, headers);
  res.end();
}

function makeSessionCookie(token, maxAgeSec) {
  return `yashnar_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}`;
}

function makeClearCookie() {
  return `yashnar_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function serveStaticFile(res, absolutePath, defaultContentType = 'text/html; charset=utf-8') {
  fs.readFile(absolutePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || defaultContentType;
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const reqPath = decodeURI(parsedUrl.pathname);
  const query = parsedUrl.query;

  // Extract Session & Current Authenticated User
  const token = serverAuth.extractTokenFromRequest(req);
  const currentUser = token ? serverAuth.getSessionUser(token) : null;

  // ==================== AUTHENTICATION API ROUTES ====================
  if (reqPath.startsWith('/api/auth/')) {
    try {
      // 1. Current user profile
      if (req.method === 'GET' && reqPath === '/api/auth/me') {
        if (!currentUser) {
          sendJson(res, 401, { ok: false, error: 'Unauthorized' });
          return;
        }
        sendJson(res, 200, currentUser);
        return;
      }

      // 2. User registration
      if (req.method === 'POST' && reqPath === '/api/auth/signup') {
        const body = await readJsonBody(req);
        const result = serverAuth.registerUser(body);
        if (!result.ok) {
          sendJson(res, 400, result);
          return;
        }
        const cookie = makeSessionCookie(result.session.token, result.session.maxAgeSec);
        sendJson(res, 201, { ok: true, user: result.user }, { 'Set-Cookie': cookie });
        return;
      }

      // 3. User login
      if (req.method === 'POST' && reqPath === '/api/auth/login') {
        const body = await readJsonBody(req);
        const result = serverAuth.loginUser(body);
        if (!result.ok) {
          sendJson(res, 401, result);
          return;
        }
        const cookie = makeSessionCookie(result.session.token, result.session.maxAgeSec);
        sendJson(res, 200, { ok: true, user: result.user }, { 'Set-Cookie': cookie });
        return;
      }

      // 4. User logout
      if (req.method === 'POST' && reqPath === '/api/auth/logout') {
        if (token) serverAuth.destroySession(token);
        const clearCookie = makeClearCookie();
        sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearCookie });
        return;
      }

      // 5. Request password reset
      if (req.method === 'POST' && reqPath === '/api/auth/forgot-password') {
        const body = await readJsonBody(req);
        const result = serverAuth.requestPasswordReset(body.email);
        sendJson(res, 200, result);
        return;
      }

      // 6. Execute password reset
      if (req.method === 'POST' && reqPath === '/api/auth/reset-password') {
        const body = await readJsonBody(req);
        const result = serverAuth.resetPassword(body);
        if (!result.ok) {
          sendJson(res, 400, result);
          return;
        }
        sendJson(res, 200, result);
        return;
      }

      // 7. Google OAuth Init
      if (req.method === 'GET' && reqPath === '/api/auth/oauth/google') {
        const redirectAfter = query.redirect || '/app';
        const details = serverAuth.getGoogleAuthDetails(redirectAfter);
        sendJson(res, 200, details);
        return;
      }

      // 8. Google OAuth Callback
      if (req.method === 'GET' && reqPath === '/api/auth/oauth/google/callback') {
        const { code, state, error } = query;
        if (error || !code || !state) {
          sendRedirect(res, `/login?oauth_error=${encodeURIComponent(error || 'Google avtorizatsiyasi bekor qilindi.')}`);
          return;
        }
        try {
          const authResult = await serverAuth.handleGoogleCallback(code, state);
          const cookie = makeSessionCookie(authResult.session.token, authResult.session.maxAgeSec);
          sendRedirect(res, authResult.redirectAfter || '/app', cookie);
          return;
        } catch (err) {
          sendRedirect(res, `/login?oauth_error=${encodeURIComponent(err.message)}`);
          return;
        }
      }

      // 9. GitHub OAuth Init
      if (req.method === 'GET' && reqPath === '/api/auth/oauth/github') {
        const redirectAfter = query.redirect || '/app';
        const details = serverAuth.getGithubAuthDetails(redirectAfter);
        sendJson(res, 200, details);
        return;
      }

      // 10. GitHub OAuth Callback
      if (req.method === 'GET' && reqPath === '/api/auth/oauth/github/callback') {
        const { code, state, error } = query;
        if (error || !code || !state) {
          sendRedirect(res, `/login?oauth_error=${encodeURIComponent(error || 'GitHub avtorizatsiyasi bekor qilindi.')}`);
          return;
        }
        try {
          const authResult = await serverAuth.handleGithubCallback(code, state);
          const cookie = makeSessionCookie(authResult.session.token, authResult.session.maxAgeSec);
          sendRedirect(res, authResult.redirectAfter || '/app', cookie);
          return;
        } catch (err) {
          sendRedirect(res, `/login?oauth_error=${encodeURIComponent(err.message)}`);
          return;
        }
      }

      sendJson(res, 404, { error: 'Auth API endpoint not found' });
      return;
    } catch (err) {
      console.error('Auth API Error:', err);
      sendJson(res, 500, { error: 'Server authentication error', message: err.message });
      return;
    }
  }

  // ==================== USER DATA ISOLATION API ROUTES ====================
  if (reqPath.startsWith('/api/user/')) {
    if (!currentUser) {
      sendJson(res, 401, { ok: false, error: 'Unauthorized: login required' });
      return;
    }

    try {
      if (req.method === 'GET' && reqPath === '/api/user/data') {
        const data = serverAuth.getUserPrivateData(currentUser.id);
        sendJson(res, 200, { ok: true, data });
        return;
      }

      if (req.method === 'POST' && reqPath === '/api/user/data') {
        const body = await readJsonBody(req);
        const updated = serverAuth.saveUserPrivateData(currentUser.id, body);
        sendJson(res, 200, { ok: true, data: updated });
        return;
      }

      sendJson(res, 404, { error: 'User API endpoint not found' });
      return;
    } catch (err) {
      console.error('User Data API Error:', err);
      sendJson(res, 500, { error: 'Internal user data error', message: err.message });
      return;
    }
  }

  // ==================== AI API ROUTES (Protected & Pedagogical) ====================
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
      console.error('AI API Error:', err);
      sendJson(res, 500, { error: 'Internal AI processing error', message: err.message });
      return;
    }
  }

  // ==================== PAGE ROUTING & GUARDS ====================

  // 1. Root: Public Landing Page
  if (reqPath === '/') {
    serveStaticFile(res, path.join(__dirname, 'landing.html'));
    return;
  }

  // 2. Login Page
  if (reqPath === '/login') {
    if (currentUser) {
      sendRedirect(res, '/app');
      return;
    }
    serveStaticFile(res, path.join(__dirname, 'login.html'));
    return;
  }

  // 3. Signup Page
  if (reqPath === '/signup') {
    if (currentUser) {
      sendRedirect(res, '/app');
      return;
    }
    serveStaticFile(res, path.join(__dirname, 'signup.html'));
    return;
  }

  // 4. Forgot Password Page
  if (reqPath === '/forgot-password') {
    serveStaticFile(res, path.join(__dirname, 'forgot-password.html'));
    return;
  }

  // 5. Protected Learning Application Route (/app or /index.html)
  if (reqPath === '/app' || reqPath === '/index.html') {
    if (!currentUser) {
      const redirectTarget = encodeURIComponent(reqPath === '/index.html' ? '/app' : reqPath);
      sendRedirect(res, `/login?redirect=${redirectTarget}&error=unauthorized`);
      return;
    }
    serveStaticFile(res, path.join(__dirname, 'index.html'));
    return;
  }

  // ==================== STATIC FILE SERVING ====================
  let filePath = path.join(__dirname, reqPath);

  // Security check: ensure path is within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Default fallback for unknown static resources
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
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
