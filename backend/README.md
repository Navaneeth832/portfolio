# Portfolio Backend

Local Express.js backend for the portfolio website.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/contact/send` | Send email via Gmail SMTP |
| GET | `/api/github/contributions` | Real GitHub contribution calendar via GraphQL |
| GET | `/api/leetcode/stats` | Live LeetCode stats proxy (avoids CORS) |

---

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your values:

#### Gmail App Password (for contact form emails)
1. Enable 2-Factor Authentication on your Google account
2. Go to: **Google Account → Security → App Passwords**
3. Create an app password (select "Mail" + "Windows Computer")
4. Paste the 16-character password into `GMAIL_APP_PASSWORD`

#### GitHub Personal Access Token (for contribution matrix)
1. Go to: **github.com/settings/tokens → Generate new token (classic)**
2. Required scope: `read:user`
3. Paste the token into `GITHUB_TOKEN`

### 3. Start the server

**Development (with auto-restart):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs at `http://localhost:5000`

---

## Running alongside the frontend

Open two terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
npm run dev
```

The frontend Vite dev server runs on `http://localhost:5173` and the backend on `http://localhost:5000`.
