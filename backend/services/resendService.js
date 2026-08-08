const { Resend } = require('resend');

// Centralized email service using Resend HTTP API SDK
let resendClient = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[resend] Warning: RESEND_API_KEY is not defined in the environment.');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Sends a portfolio contact notification email.
 * 
 * @param {Object} params
 * @param {string} params.name - Name of the sender
 * @param {string} params.email - Email of the sender
 * @param {string} params.message - Message body
 * @returns {Promise<Object>} Resend API response
 */
async function sendContactEmail({ name, email, message }) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error('Resend is not fully configured. RESEND_FROM_EMAIL and RESEND_TO_EMAIL are required.');
  }

  const client = getResendClient();

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    reply_to: email, // Direct replies will go to the visitor's email
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
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
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
              <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
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

  const response = await client.emails.send(mailOptions);
  
  if (response.error) {
    throw new Error(response.error.message || 'Unknown error occurred while sending email via Resend.');
  }

  return response.data;
}

module.exports = {
  sendContactEmail,
};
