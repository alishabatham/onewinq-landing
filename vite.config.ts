import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Vite Plugin to handle Nodemailer /api/send-email endpoint during development
function nodemailerPlugin(): Plugin {
  return {
    name: 'vite-plugin-nodemailer',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || '';
        if (rawUrl === '/api/send-email' || rawUrl.startsWith('/api/send-email')) {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          }

          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            let payload: any = {};
            try {
              payload = JSON.parse(body || '{}');
            } catch (e) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: 'Invalid JSON request body.' }));
            }

            try {
              const { name, email, handle, message } = payload;

              if (!name || !email) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Name and email are required.' }));
              }

              const smtpUser = process.env.SMTP_USER || 'alishabatham2@gmail.com';
              const rawPass = process.env.SMTP_PASS || 'lkgmbcgdvnwiczbe';
              const smtpPass = rawPass.replace(/\s+/g, '');

              console.log(`📧 Sending email via Gmail SMTP from: ${smtpUser} to: support@onewinq.com`);

              // Configure Nodemailer Gmail SMTP Transporter
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: smtpUser,
                  pass: smtpPass,
                },
              });

              const mailOptions = {
                from: `"OneWinq Early Access" <${smtpUser}>`,
                to: 'support@onewinq.com',
                replyTo: email,
                subject: `🚀 New 'Grab Your Spot' Reservation from ${name}`,
                text: `New Reservation Request:\n\nName: ${name}\nEmail: ${email}\nDesired Handle: onewinq.me/${handle || 'none'}\nMessage: ${message || 'No additional note'}\n\nSender Configured: ${smtpUser}\nRecipient: support@onewinq.com`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
                    <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">New 'Grab Your Spot' Reservation</h2>
                    <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>User Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
                    <p><strong>Desired Handle:</strong> <code>onewinq.me/${handle || 'none'}</code></p>
                    <p><strong>Message / Note:</strong> ${message || 'N/A'}</p>
                    <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
                    <p style="font-size: 12px; color: #76667d; margin-bottom: 0;">Sent via <strong>Nodemailer</strong> to <strong>support@onewinq.com</strong> from sender <strong>${smtpUser}</strong></p>
                  </div>
                `,
              };

              const info = await transporter.sendMail(mailOptions);
              console.log('✅ Gmail Nodemailer sent email successfully! Message ID:', info.messageId);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, messageId: info.messageId }));
            } catch (error: any) {
              console.error('❌ Gmail Nodemailer Error:', error?.message || error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: error?.message || 'Failed to send email via Nodemailer.' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), nodemailerPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
