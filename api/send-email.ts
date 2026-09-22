import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { connectDB, Prebooking } from '../server/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message, cardType, cardName, originalPrice, discount, finalPrice } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required.' });
    }

    // Save to MongoDB Atlas
    let mongoId: string | null = null;
    try {
      await connectDB();
      const newPrebooking = new Prebooking({
        name,
        email,
        message,
        cardType: cardType || 'pvc',
        cardName: cardName || 'PVC Card',
        originalPrice: originalPrice || 500,
        discount: discount || 100,
        finalPrice: finalPrice || 400,
      });
      await newPrebooking.save();
      mongoId = newPrebooking._id.toString();
      console.log('💾 Prebooking saved to MongoDB Atlas:', mongoId);
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

    const selectedCardStr = cardName ? `${cardName} (₹${finalPrice || 'Pre-booked'})` : 'Default Spot Reservation';

    const mailOptions = {
      from: `"OneWinq Pre-Booking" <${smtpUser}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `🚀 New OneWinq Card Pre-Booking (${cardName || 'Spot'}) from ${name}`,
      text: `New Pre-Booking Request:\n\nName: ${name}\nEmail: ${email}\nCard Selected: ${selectedCardStr}\nMessage: ${message || 'No additional note'}\nMongoDB ID: ${mongoId || 'N/A'}\n\nSender Configured: ${smtpUser}\nRecipient: support@onewinq.com`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
          <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">New OneWinq Card Pre-Booking</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>User Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
          <p style="background: #f3e8ff; padding: 12px; border-radius: 8px; color: #6b21a8; font-weight: bold;">Card Pre-Ordered: ${selectedCardStr} (₹100 Instant Discount Applied)</p>
          <p><strong>Delivery Address / Note:</strong> ${message || 'N/A'}</p>
          ${mongoId ? `<p style="font-size: 12px; color: #16a34a; background: #dcfce7; padding: 8px; border-radius: 6px;">✅ Saved in MongoDB Atlas ID: <code>${mongoId}</code></p>` : ''}
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p style="font-size: 12px; color: #76667d; margin-bottom: 0;">Sent via <strong>Nodemailer (Vercel Serverless)</strong> to <strong>support@onewinq.com</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Vercel Nodemailer sent email successfully! Message ID:', info.messageId);

    return res.status(200).json({ success: true, mongoId, messageId: info.messageId });
  } catch (error: any) {
    console.error('❌ Vercel Nodemailer Error:', error?.message || error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to send email via Nodemailer.' });
  }
}
