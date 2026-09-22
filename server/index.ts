import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { connectDB, Prebooking, Contact } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize MongoDB Connection
connectDB();

// Configure Nodemailer transporter
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

// 1. API Endpoint: Smart Card Pre-Booking (Stores in MongoDB Atlas & sends Email)
app.post('/api/send-email', async (req, res) => {
  const { name, email, handle, message, cardType, cardName, originalPrice, discount, finalPrice } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required.' });
  }

  try {
    // Save to MongoDB Atlas
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
    console.log('💾 Pre-booking saved to MongoDB Atlas:', newPrebooking._id);

    // Send email notification via Nodemailer to support@onewinq.com
    const transporter = await createTransporter();
    const selectedCardStr = cardName ? `${cardName} (₹${finalPrice})` : 'Smart NFC Card';

    const mailOptions = {
      from: `"OneWinq Pre-Booking" <${process.env.SMTP_USER || 'alishabatham2@gmail.com'}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `🚀 New OneWinq Card Pre-Booking (${cardName || 'NFC Card'}) from ${name}`,
      text: `New Pre-Booking Request:\n\nName: ${name}\nEmail: ${email}\nCard Selected: ${selectedCardStr}\nMessage/Note: ${message || 'No additional note'}\nMongoDB Record ID: ${newPrebooking._id}\n\nRecipient: support@onewinq.com`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
          <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">New OneWinq NFC Card Pre-Booking</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
          <p style="background: #f3e8ff; padding: 12px; border-radius: 8px; color: #6b21a8; font-weight: bold;">Card Pre-Ordered: ${selectedCardStr} (₹100 Discount Applied)</p>
          <p><strong>Delivery Address / Note:</strong> ${message || 'N/A'}</p>
          <p style="font-size: 12px; color: #16a34a; background: #dcfce7; padding: 8px; border-radius: 6px;">✅ Saved in MongoDB Atlas ID: <code>${newPrebooking._id}</code></p>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p style="font-size: 12px; color: #76667d; margin-bottom: 0;">Sent via Nodemailer to <strong>support@onewinq.com</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Nodemailer pre-booking email sent:', info.messageId);

    return res.json({
      success: true,
      mongoId: newPrebooking._id,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('❌ Failed to process pre-booking:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to process pre-booking.' });
  }
});

// 2. API Endpoint: Contact Us Form (Stores in MongoDB Atlas & sends Email)
app.post('/api/send-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  try {
    // Save to MongoDB Atlas
    await connectDB();
    const newContact = new Contact({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });
    await newContact.save();
    console.log('💾 Contact response saved to MongoDB Atlas:', newContact._id);

    // Send email notification via Nodemailer to support@onewinq.com
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"OneWinq Contact Us" <${process.env.SMTP_USER || 'alishabatham2@gmail.com'}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `📩 New Contact Form Message: [${subject || 'General'}] from ${name}`,
      text: `New Contact Message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\nMongoDB Record ID: ${newContact._id}\n\nRecipient: support@onewinq.com`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
          <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">New Contact Us Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
          <p><strong>Topic / Subject:</strong> ${subject || 'N/A'}</p>
          <p style="background: #ffffff; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;"><strong>Message:</strong><br />${message}</p>
          <p style="font-size: 12px; color: #16a34a; background: #dcfce7; padding: 8px; border-radius: 6px;">✅ Saved in MongoDB Atlas ID: <code>${newContact._id}</code></p>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p style="font-size: 12px; color: #76667d; margin-bottom: 0;">Sent via Nodemailer to <strong>support@onewinq.com</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Nodemailer contact email sent:', info.messageId);

    return res.json({
      success: true,
      mongoId: newContact._id,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('❌ Failed to process contact message:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to process contact message.' });
  }
});

// Start Express server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Nodemailer Express server running on http://localhost:${PORT}`);
  });
}

export default app;
