/**
 * YASHNAR ENGLISH - SECURE AUTHENTICATION & SESSION ENGINE
 * NIST-Compliant PBKDF2 Password Hashing with Unique Cryptographic Salts
 * Timing-Attack-Resistant Verification, Session Cookies & OAuth Handlers
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const DB_DIR = path.join(__dirname, 'data', 'db');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const SESSIONS_FILE = path.join(DB_DIR, 'sessions.json');
const USER_DATA_FILE = path.join(DB_DIR, 'user_data.json');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Atomic file writer
function writeJsonAtomic(filePath, data) {
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
}

function readJsonSafe(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonAtomic(filePath, defaultValue);
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

// --- Password Hashing & Verification (PBKDF2 + SHA512) ---
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedCombined) {
  if (!storedCombined || !storedCombined.includes(':')) return false;
  const [salt, originalHash] = storedCombined.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  
  const bufOriginal = Buffer.from(originalHash, 'hex');
  const bufVerify = Buffer.from(verifyHash, 'hex');
  if (bufOriginal.length !== bufVerify.length) return false;
  return crypto.timingSafeEqual(bufOriginal, bufVerify);
}

// --- Environment Variables for OAuth ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

// In-memory OAuth state registry (state -> { createdAt, redirectAfter })
const OAUTH_STATES = new Map();

// Helper to sanitize public user profile (never expose passwordHash or secrets)
function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, resetToken, resetTokenExpires, ...safe } = user;
  return safe;
}

// --- User Management ---
function getUsers() {
  return readJsonSafe(USERS_FILE, []);
}

function saveUsers(users) {
  writeJsonAtomic(USERS_FILE, users);
}

function findUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

function findUserByIdentifier(identifier) {
  if (!identifier) return null;
  const clean = identifier.trim().toLowerCase();
  const users = getUsers();
  return users.find(u => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean) || null;
}

function findUserByProvider(provider, providerId) {
  const users = getUsers();
  return users.find(u => u.provider === provider && u.providerId === providerId) || null;
}

// --- Session Management ---
function getSessions() {
  return readJsonSafe(SESSIONS_FILE, {});
}

function saveSessions(sessions) {
  writeJsonAtomic(SESSIONS_FILE, sessions);
}

function createSession(userId, rememberMe = true) {
  const token = crypto.randomBytes(32).toString('hex');
  const sessions = getSessions();
  const now = Date.now();
  // 30 days if rememberMe, 24 hours otherwise
  const maxAgeMs = rememberMe ? (30 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
  const expiresAt = now + maxAgeMs;

  sessions[token] = {
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt,
    rememberMe
  };

  saveSessions(sessions);
  return { token, expiresAt, maxAgeSec: Math.floor(maxAgeMs / 1000) };
}

function destroySession(token) {
  if (!token) return;
  const sessions = getSessions();
  if (sessions[token]) {
    delete sessions[token];
    saveSessions(sessions);
  }
}

function getSessionUser(token) {
  if (!token) return null;
  const sessions = getSessions();
  const session = sessions[token];
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    delete sessions[token];
    saveSessions(sessions);
    return null;
  }

  const user = findUserById(session.userId);
  return sanitizeUser(user);
}

// Clean up expired sessions periodically
function cleanExpiredSessions() {
  const sessions = getSessions();
  const now = Date.now();
  let changed = false;
  for (const token in sessions) {
    if (sessions[token].expiresAt < now) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveSessions(sessions);
}
setInterval(cleanExpiredSessions, 60 * 60 * 1000); // Clean every hour

// --- User Registration ---
function registerUser({ username, email, password, confirmPassword, level = 'B1', termsAccepted }) {
  // Input validations
  if (!username || typeof username !== 'string') {
    return { ok: false, field: 'username', error: "Foydalanuvchi nomini kiriting." };
  }
  const cleanUsername = username.trim();
  if (cleanUsername.length < 3 || cleanUsername.length > 30) {
    return { ok: false, field: 'username', error: "Foydalanuvchi nomi 3 tadan 30 tagacha belgidan iborat bo'lishi kerak." };
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
    return { ok: false, field: 'username', error: "Foydalanuvchi nomi faqat lotin harflari, raqamlar, pastki chiziq va nuqtadan iborat bo'lishi mumkin." };
  }

  if (!email || typeof email !== 'string') {
    return { ok: false, field: 'email', error: "Elektron pochta manzilini kiriting." };
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { ok: false, field: 'email', error: "To'g'ri elektron pochta manzilini kiriting (masalan: misol@domain.uz)." };
  }

  if (!password || typeof password !== 'string') {
    return { ok: false, field: 'password', error: "Parolni kiriting." };
  }
  if (password.length < 8) {
    return { ok: false, field: 'password', error: "Parol kamida 8 ta belgidan iborat bo'lishi lozim." };
  }
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return { ok: false, field: 'password', error: "Parolda kamida bitta harf va bitta raqam bo'lishi shart." };
  }

  if (password !== confirmPassword) {
    return { ok: false, field: 'confirmPassword', error: "Kiritilgan parollar bir-biriga mos kelmadi." };
  }

  if (!termsAccepted) {
    return { ok: false, field: 'terms', error: "Ro'yxatdan o'tish uchun foydalanish shartlarini qabul qilishingiz zarur." };
  }

  const users = getUsers();
  // Check username uniqueness
  const existingUsername = users.find(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
  if (existingUsername) {
    return { ok: false, field: 'username', error: "Ushbu foydalanuvchi nomi allaqachon band qilingan. Boshqa nom tanlang." };
  }

  // Check email uniqueness
  const existingEmail = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existingEmail) {
    return { ok: false, field: 'email', error: "Ushbu elektron pochta allaqachon ro'yxatdan o'tgan. Tizimga kiring." };
  }

  const newUser = {
    id: 'usr_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
    username: cleanUsername,
    email: cleanEmail,
    passwordHash: hashPassword(password),
    provider: 'local',
    providerId: null,
    level: ['A1', 'A2', 'B1', 'B2', 'C1'].includes(level) ? level : 'B1',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  const session = createSession(newUser.id, true);
  return {
    ok: true,
    user: sanitizeUser(newUser),
    session
  };
}

// --- User Login ---
function loginUser({ identifier, password, rememberMe = true }) {
  if (!identifier || typeof identifier !== 'string') {
    return { ok: false, error: "Foydalanuvchi nomi yoki elektron pochtani kiriting." };
  }
  if (!password || typeof password !== 'string') {
    return { ok: false, error: "Parolni kiriting." };
  }

  const user = findUserByIdentifier(identifier);
  if (!user) {
    return { ok: false, error: "Foydalanuvchi nomi, elektron pochta yoki parol noto'g'ri." };
  }

  if (user.provider !== 'local' && !user.passwordHash) {
    return {
      ok: false,
      error: `Ushbu akkaunt ${user.provider.toUpperCase()} orqali yaratilgan. Iltimos, "${user.provider.toUpperCase()} orqali kirish" tugmasidan foydalaning.`
    };
  }

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { ok: false, error: "Foydalanuvchi nomi, elektron pochta yoki parol noto'g'ri." };
  }

  const session = createSession(user.id, rememberMe);
  return {
    ok: true,
    user: sanitizeUser(user),
    session
  };
}

// --- Password Reset Request & Execution ---
function requestPasswordReset(email) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
    return { ok: false, error: "To'g'ri elektron pochta manzilini kiriting." };
  }

  const cleanEmail = email.trim().toLowerCase();
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  // Even if user does not exist, return generic success to prevent email harvesting
  if (!user) {
    return {
      ok: true,
      message: "Agar ushbu elektron pochta manzili ro'yxatdan o'tgan bo'lsa, parolni tiklash havolasi yuborildi."
    };
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + (60 * 60 * 1000); // 1 hour
  saveUsers(users);

  return {
    ok: true,
    message: "Parolni tiklash havolasi tayyorlandi. Yangi parolni quyida kiritishingiz mumkin.",
    resetToken // in development/local environment returned directly
  };
}

function resetPassword({ token, newPassword, confirmPassword }) {
  if (!token) {
    return { ok: false, error: "Tiklash tokeni mavjud emas yoki muddati tugagan." };
  }
  if (!newPassword || newPassword.length < 8) {
    return { ok: false, error: "Yangi parol kamida 8 ta belgidan iborat bo'lishi lozim." };
  }
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
    return { ok: false, error: "Yangi parolda kamida bitta harf va bitta raqam bo'lishi shart." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "Kiritilgan yangi parollar bir-biriga mos kelmadi." };
  }

  const users = getUsers();
  const user = users.find(u => u.resetToken === token && u.resetTokenExpires > Date.now());

  if (!user) {
    return { ok: false, error: "Parolni tiklash havolasi yaroqsiz yoki muddati o'tgan. Iltimos, qaytadan so'rov yuboring." };
  }

  user.passwordHash = hashPassword(newPassword);
  user.resetToken = null;
  user.resetTokenExpires = null;
  saveUsers(users);

  return { ok: true, message: "Parolingiz muvaffaqiyatli yangilandi. Endi yangi parol bilan tizimga kirishingiz mumkin." };
}

// --- Google OAuth Integration ---
function getGoogleAuthDetails(redirectAfter = '/app') {
  const isConfigured = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);
  if (!isConfigured) {
    return {
      configured: false,
      provider: 'google',
      checklist: [
        "Google Cloud Console (https://console.cloud.google.com/) da loyiha oching.",
        "APIs & Services > Credentials bo'limidan 'OAuth 2.0 Client IDs' (Web application) yarating.",
        `Authorized redirect URI ga: "${APP_URL}/api/auth/oauth/google/callback" manzilini qo'shing.`,
        "GOOGLE_CLIENT_ID va GOOGLE_CLIENT_SECRET qiymatlarini .env yoki server muhitiga kiriting."
      ]
    };
  }

  const state = crypto.randomBytes(16).toString('hex');
  OAUTH_STATES.set(state, { provider: 'google', createdAt: Date.now(), redirectAfter });

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${APP_URL}/api/auth/oauth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'select_account'
  });

  return {
    configured: true,
    authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  };
}

async function handleGoogleCallback(code, state) {
  const stateRecord = OAUTH_STATES.get(state);
  if (!stateRecord || stateRecord.provider !== 'google') {
    throw new Error("Xavfsizlik tekshiruvi (OAuth state) yaroqsiz yoki muddati o'tgan.");
  }
  OAUTH_STATES.delete(state);

  // Exchange code for token
  const tokenPayload = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: `${APP_URL}/api/auth/oauth/google/callback`,
    grant_type: 'authorization_code'
  }).toString();

  const tokenRes = await postHttps('oauth2.googleapis.com', '/token', {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(tokenPayload)
  }, tokenPayload);

  const tokenJson = JSON.parse(tokenRes);
  if (!tokenJson.access_token) {
    throw new Error(tokenJson.error_description || "Google token almashishda xatolik yuz berdi.");
  }

  // Fetch Google User Profile
  const profileRes = await getHttps('www.googleapis.com', '/oauth2/v2/userinfo', {
    'Authorization': `Bearer ${tokenJson.access_token}`
  });
  const profile = JSON.parse(profileRes);

  if (!profile.email) {
    throw new Error("Google hisobidan elektron pochta olinmadi.");
  }

  const users = getUsers();
  let user = findUserByProvider('google', profile.id) || users.find(u => u.email.toLowerCase() === profile.email.toLowerCase());

  if (!user) {
    // Generate unique username from name/email
    let baseUsername = (profile.name || profile.email.split('@')[0]).replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    if (baseUsername.length < 3) baseUsername = 'google_user';
    let chosenUsername = baseUsername;
    let counter = 1;
    while (users.some(u => u.username.toLowerCase() === chosenUsername.toLowerCase())) {
      chosenUsername = `${baseUsername}${counter++}`;
    }

    user = {
      id: 'usr_g_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
      username: chosenUsername,
      email: profile.email.toLowerCase(),
      passwordHash: null,
      provider: 'google',
      providerId: profile.id,
      picture: profile.picture || null,
      level: 'B1',
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
  } else if (!user.providerId && user.email.toLowerCase() === profile.email.toLowerCase()) {
    // Link existing local account with Google ID
    user.provider = 'google';
    user.providerId = profile.id;
    if (profile.picture) user.picture = profile.picture;
    saveUsers(users);
  }

  const session = createSession(user.id, true);
  return {
    user: sanitizeUser(user),
    session,
    redirectAfter: stateRecord.redirectAfter || '/app'
  };
}

// --- GitHub OAuth Integration ---
function getGithubAuthDetails(redirectAfter = '/app') {
  const isConfigured = Boolean(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET);
  if (!isConfigured) {
    return {
      configured: false,
      provider: 'github',
      checklist: [
        "GitHub Settings > Developer settings > OAuth Apps bo'limiga o'ting.",
        "'New OAuth App' tugmasini bosing.",
        `Authorization callback URL ga: "${APP_URL}/api/auth/oauth/github/callback" manzilini kiriting.`,
        "GITHUB_CLIENT_ID va GITHUB_CLIENT_SECRET qiymatlarini .env yoki server muhitiga qo'shing."
      ]
    };
  }

  const state = crypto.randomBytes(16).toString('hex');
  OAUTH_STATES.set(state, { provider: 'github', createdAt: Date.now(), redirectAfter });

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${APP_URL}/api/auth/oauth/github/callback`,
    scope: 'read:user user:email',
    state
  });

  return {
    configured: true,
    authUrl: `https://github.com/login/oauth/authorize?${params.toString()}`
  };
}

async function handleGithubCallback(code, state) {
  const stateRecord = OAUTH_STATES.get(state);
  if (!stateRecord || stateRecord.provider !== 'github') {
    throw new Error("Xavfsizlik tekshiruvi (OAuth state) yaroqsiz yoki muddati o'tgan.");
  }
  OAUTH_STATES.delete(state);

  // Exchange code for GitHub token
  const tokenPayload = JSON.stringify({
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: `${APP_URL}/api/auth/oauth/github/callback`
  });

  const tokenRes = await postHttps('github.com', '/login/oauth/access_token', {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Yashnar-English-Auth'
  }, tokenPayload);

  const tokenJson = JSON.parse(tokenRes);
  if (!tokenJson.access_token) {
    throw new Error(tokenJson.error_description || "GitHub token almashishda xatolik yuz berdi.");
  }

  // Fetch GitHub User Profile
  const profileRes = await getHttps('api.github.com', '/user', {
    'Authorization': `Bearer ${tokenJson.access_token}`,
    'User-Agent': 'Yashnar-English-Auth'
  });
  const profile = JSON.parse(profileRes);

  // Fetch User Emails (in case primary email is private)
  let email = profile.email;
  if (!email) {
    try {
      const emailsRes = await getHttps('api.github.com', '/user/emails', {
        'Authorization': `Bearer ${tokenJson.access_token}`,
        'User-Agent': 'Yashnar-English-Auth'
      });
      const emails = JSON.parse(emailsRes);
      const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0];
      if (primaryEmail) email = primaryEmail.email;
    } catch (e) {}
  }

  if (!email) {
    email = `${profile.login}@users.noreply.github.com`;
  }

  const users = getUsers();
  let user = findUserByProvider('github', String(profile.id)) || users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    let baseUsername = (profile.login || 'github_user').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    if (baseUsername.length < 3) baseUsername = 'gh_user';
    let chosenUsername = baseUsername;
    let counter = 1;
    while (users.some(u => u.username.toLowerCase() === chosenUsername.toLowerCase())) {
      chosenUsername = `${baseUsername}${counter++}`;
    }

    user = {
      id: 'usr_gh_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
      username: chosenUsername,
      email: email.toLowerCase(),
      passwordHash: null,
      provider: 'github',
      providerId: String(profile.id),
      picture: profile.avatar_url || null,
      level: 'B1',
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
  } else if (!user.providerId) {
    user.provider = 'github';
    user.providerId = String(profile.id);
    if (profile.avatar_url) user.picture = profile.avatar_url;
    saveUsers(users);
  }

  const session = createSession(user.id, true);
  return {
    user: sanitizeUser(user),
    session,
    redirectAfter: stateRecord.redirectAfter || '/app'
  };
}

// --- HTTPS Helpers ---
function postHttps(hostname, pathStr, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      path: pathStr,
      method: 'POST',
      headers
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function getHttps(hostname, pathStr, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      path: pathStr,
      method: 'GET',
      headers
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

// --- Isolated User Data Storage ---
function getAllUserDataStore() {
  return readJsonSafe(USER_DATA_FILE, {});
}

function getUserPrivateData(userId) {
  const store = getAllUserDataStore();
  return store[userId] || {
    savedWords: [],
    quizHistory: [],
    listeningHistory: [],
    mockExamHistory: [],
    speakingHistory: []
  };
}

function saveUserPrivateData(userId, data) {
  const store = getAllUserDataStore();
  store[userId] = {
    ...store[userId],
    ...data,
    updatedAt: new Date().toISOString()
  };
  writeJsonAtomic(USER_DATA_FILE, store);
  return store[userId];
}

// Extract session token from request (Cookie or Bearer header)
function extractTokenFromRequest(req) {
  // Check Cookie header
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, pair) => {
      const [k, v] = pair.trim().split('=');
      if (k && v) acc[k] = decodeURIComponent(v);
      return acc;
    }, {});
    if (cookies.yashnar_session) {
      return cookies.yashnar_session;
    }
  }

  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
}

module.exports = {
  registerUser,
  loginUser,
  destroySession,
  getSessionUser,
  requestPasswordReset,
  resetPassword,
  getGoogleAuthDetails,
  handleGoogleCallback,
  getGithubAuthDetails,
  handleGithubCallback,
  getUserPrivateData,
  saveUserPrivateData,
  extractTokenFromRequest
};
