/**
 * Central API configuration.
 * Change the backend URL by editing VITE_API_BASE_URL in the .env file at the project root.
 *
 * Local dev:   VITE_API_BASE_URL=http://localhost:5000
 * Production:  VITE_API_BASE_URL=https://your-deployed-backend.com
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export const ENDPOINTS = {
  contact:       `${API_BASE}/api/contact/send`,
  github:        `${API_BASE}/api/github/contributions`,
  leetcode:      `${API_BASE}/api/leetcode/stats`,
} as const;
