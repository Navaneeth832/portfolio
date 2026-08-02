const express = require('express');
const axios = require('axios');
const router = express.Router();

const LEETCODE_API = 'https://leetcode.com/graphql';
const USERNAME = process.env.LEETCODE_USERNAME || 'Navaneeth832';

// ── GET /api/leetcode/stats ─────────────────────────────────────────────────
// Proxies LeetCode's public GraphQL endpoint to avoid browser CORS restrictions.
// No auth token required — uses LeetCode's public (unauthenticated) schema.
router.get('/stats', async (req, res) => {
  const query = `
    query CombinedStats($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
          starRating
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
    }
  `;

  try {
    const response = await axios.post(
      LEETCODE_API,
      { query, variables: { username: USERNAME } },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36',
          Referer: 'https://leetcode.com',
          Origin: 'https://leetcode.com',
        },
        timeout: 15000,
      }
    );

    const data = response.data;

    if (data.errors) {
      console.error('[leetcode] GraphQL errors:', data.errors);
      return res.status(400).json({ error: data.errors[0].message });
    }

    const user = data.data?.matchedUser;
    if (!user) {
      return res.status(404).json({ error: `LeetCode user "${USERNAME}" not found.` });
    }

    // Parse submission stats into a cleaner shape
    const acStats = user.submitStats.acSubmissionNum;
    const totalStats = user.submitStats.totalSubmissionNum;

    const findCount = (arr, difficulty) =>
      arr.find((s) => s.difficulty === difficulty)?.count ?? 0;

    const findSubmissions = (arr, difficulty) =>
      arr.find((s) => s.difficulty === difficulty)?.submissions ?? 0;

    const totalSolved = findCount(acStats, 'All');
    const easySolved = findCount(acStats, 'Easy');
    const mediumSolved = findCount(acStats, 'Medium');
    const hardSolved = findCount(acStats, 'Hard');
    const totalSubmissions = findSubmissions(totalStats, 'All');
    const acceptanceRate =
      totalSubmissions > 0
        ? ((totalSolved / totalSubmissions) * 100).toFixed(1) + '%'
        : 'N/A';

    // Top DSA tags across all difficulties
    const allTags = [
      ...(user.tagProblemCounts?.advanced ?? []),
      ...(user.tagProblemCounts?.intermediate ?? []),
      ...(user.tagProblemCounts?.fundamental ?? []),
    ]
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .slice(0, 10);

    res.json({
      username: user.username,
      ranking: user.profile.ranking,
      solved: {
        total: totalSolved,
        easy: easySolved,
        medium: mediumSolved,
        hard: hardSolved,
      },
      acceptanceRate,
      contest: data.data.userContestRanking
        ? {
            attended: data.data.userContestRanking.attendedContestsCount,
            rating: Math.round(data.data.userContestRanking.rating),
            globalRank: data.data.userContestRanking.globalRanking,
            topPercentage: data.data.userContestRanking.topPercentage?.toFixed(1),
          }
        : null,
      topTags: allTags,
    });
  } catch (err) {
    if (err.response) {
      console.error('[leetcode] HTTP error:', err.response.status);
      return res.status(err.response.status).json({
        error: 'LeetCode API error',
        status: err.response.status,
      });
    }
    console.error('[leetcode] Request failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch LeetCode data', details: err.message });
  }
});

module.exports = router;
