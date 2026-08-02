require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactRouter = require('./routes/contact');
const githubRouter = require('./routes/github');
const leetcodeRouter = require('./routes/leetcode');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:4173',  // Vite preview
    'http://127.0.0.1:5173',
    '*',
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ── Health check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter);
app.use('/api/github', githubRouter);
app.use('/api/leetcode', leetcodeRouter);

// ── 404 catch-all ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Portfolio backend running at http://localhost:${PORT}`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/contact/send`);
  console.log(`   GET  /api/github/contributions`);
  console.log(`   GET  /api/leetcode/stats\n`);
});
