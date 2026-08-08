const express = require('express');
const resendService = require('../services/resendService');
const router = express.Router();

// ── POST /api/contact/send ──────────────────────────────────────────────────
// Body: { name: string, email: string, message: string }
// Sends an email using the Resend service.
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'name, email, and message are required.',
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email address.',
    });
  }

  // Configuration check
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
    console.error('[contact] Resend API environment variables are not fully configured in .env');
    return res.status(500).json({
      success: false,
      error: 'Email service is not configured on the server.',
    });
  }

  try {
    const data = await resendService.sendContactEmail({ name, email, message });
    console.log(`[contact] Email sent successfully via Resend. ID: ${data.id}`);
    res.json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[contact] Failed to send email via Resend:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
});

module.exports = router;
