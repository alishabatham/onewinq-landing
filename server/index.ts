import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
// Uses environment variables or Gmail SMTP / Ethereal test transport as fallback
const createTransporter = async () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const rawPass = process.env.SMTP_PASS;
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'alishabatham2@gmail.com',
        pass: rawPass.replace(/\s+/g, ''),
      },
    });
  }

  // Fallback: Create test account if no SMTP password is supplied locally
  const testAccount = await nodemailer.createTestAccount();
  console.log('📧 Created Nodemailer Ethereal test account for local development');
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

app.post('/api/send-email', async (req, res) => {
  const { name, email, handle, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"OneWinq Early Access" <${process.env.SMTP_USER || 'alishabatham2@gmail.com'}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `🚀 New 'Grab Your Spot' Reservation from ${name}`,
      text: `New Reservation Request:\n\nName: ${name}\nEmail: ${email}\nDesired Handle: onewinq.me/${handle || 'none'}\nMessage: ${message || 'No additional note'}\n\nSender Configured: alishabatham2@gmail.com\nRecipient: support@onewinq.com`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #09070d; max-width: 500px; border: 1px solid #e4d8ec; border-radius: 12px;">
          <h2 style="color: #7b2cbf; margin-top: 0;">New 'Grab Your Spot' Reservation</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Desired Handle:</strong> <code>onewinq.me/${handle || 'none'}</code></p>
          <p><strong>Message/Note:</strong> ${message || 'N/A'}</p>
          <hr style="border: 0; border-top: 1px solid #e4d8ec;" />
          <p style="font-size: 12px; color: #76667d;">Sent via Nodemailer to <strong>support@onewinq.com</strong> from sender <strong>alishabatham2@gmail.com</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Nodemailer email sent successfully:', info.messageId);

    // If using Ethereal test transport, log preview URL
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('🔗 Email Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return res.json({
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) || null,
    });
  } catch (error) {
    console.error('❌ Nodemailer failed to send email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email via Nodemailer.' });
  }
});

// Start Express server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Nodemailer Express server running on http://localhost:${PORT}`);
  });
}

export default app;
