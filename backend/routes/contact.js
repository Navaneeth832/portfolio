const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// ── POST /api/contact/send ──────────────────────────────────────────────────
// Body: { name: string, email: string, message: string }
// Sends an email to GMAIL_USER (your inbox) using Gmail SMTP + App Password.
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

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('[contact] GMAIL_USER or GMAIL_APP_PASSWORD not set in .env');
    return res.status(500).json({
      success: false,
      error: 'Email service is not configured on the server.',
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,           // send to yourself
    replyTo: email,                        // reply-to goes to the visitor
    subject: `[Portfolio] New message from ${name}`,
    text: `
You received a new message from your portfolio contact form.

──────────────────────────────
Name    : ${name}
Email   : ${email}
──────────────────────────────

${message}
    `.trim(),
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">
          New Portfolio Message
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 80px; font-size: 13px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; color: #334155;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
          This message was sent from your portfolio contact form. Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[contact] Email sent: ${info.messageId} from ${email}`);
    res.json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[contact] Failed to send email:', err.message);
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
});

module.exports = router;
