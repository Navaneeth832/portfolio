const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_API = 'https://api.github.com/graphql';
const USERNAME = 'Navaneeth832';

// ── GET /api/github/contributions ──────────────────────────────────────────
// Returns the real contribution calendar for the past year via GitHub GraphQL.
// Requires GITHUB_TOKEN in .env (Personal Access Token, scope: read:user).
router.get('/contributions', async (req, res) => {
  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({
      error: 'GITHUB_TOKEN not configured in .env',
    });
  }

  const query = `
    query ContributionCalendar($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        url
        followers { totalCount }
        following { totalCount }
        repositories(privacy: PUBLIC) { totalCount }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      GITHUB_API,
      { query, variables: { username: USERNAME } },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'portfolio-backend',
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    if (data.errors) {
      console.error('[github] GraphQL errors:', data.errors);
      return res.status(400).json({ error: data.errors[0].message });
    }

    const user = data.data.user;
    if (!user) {
      return res.status(404).json({ error: `GitHub user "${USERNAME}" not found.` });
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    // Flatten weeks → days for easy frontend consumption
    const days = calendar.weeks.flatMap((week) => week.contributionDays);

    res.json({
      profile: {
        name: user.name || user.login,
        login: user.login,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        url: user.url,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        publicRepos: user.repositories.totalCount,
      },
      contributions: {
        total: calendar.totalContributions,
        weeks: calendar.weeks,
        days,           // flat array: [{ date, contributionCount, weekday }, ...]
      },
    });
  } catch (err) {
    if (err.response) {
      console.error('[github] HTTP error:', err.response.status, err.response.data);
      return res.status(err.response.status).json({
        error: 'GitHub API error',
        details: err.response.data,
      });
    }
    console.error('[github] Request failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch GitHub data', details: err.message });
  }
});

module.exports = router;
