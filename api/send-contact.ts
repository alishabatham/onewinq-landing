import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { connectDB, Contact } from '../server/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    // Save to MongoDB Atlas
    let mongoId: string | null = null;
    try {
      await connectDB();
      const newContact = new Contact({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      });
      await newContact.save();
      mongoId = newContact._id.toString();
      console.log('💾 Contact response saved to MongoDB Atlas:', mongoId);
    } catch (dbErr) {
      console.error('⚠️ Could not save to MongoDB Atlas (will still send email):', dbErr);
    }

    const smtpUser = process.env.SMTP_USER || 'alishabatham2@gmail.com';
    const rawPass = process.env.SMTP_PASS || 'lkgmbcgdvnwiczbe';
    const smtpPass = rawPass.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"OneWinq Contact Us" <${smtpUser}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `📩 New Contact Form Message: [${subject || 'General'}] from ${name}`,
      text: `New Contact Message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\nMongoDB ID: ${mongoId || 'N/A'}\n\nRecipient: support@onewinq.com`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
          <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">New Contact Us Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
          <p><strong>Topic / Subject:</strong> ${subject || 'N/A'}</p>
          <p style="background: #ffffff; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;"><strong>Message:</strong><br />${message}</p>
          ${mongoId ? `<p style="font-size: 12px; color: #16a34a; background: #dcfce7; padding: 8px; border-radius: 6px;">✅ Saved in MongoDB Atlas ID: <code>${mongoId}</code></p>` : ''}
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p style="font-size: 12px; color: #76667d; margin-bottom: 0;">Sent via Nodemailer to <strong>support@onewinq.com</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Vercel Nodemailer contact email sent:', info.messageId);

    return res.status(200).json({ success: true, mongoId, messageId: info.messageId });
  } catch (error: any) {
    console.error('❌ Vercel Nodemailer Error:', error?.message || error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to send message via Nodemailer.' });
  }
}
