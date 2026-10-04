import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
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

// 2. API Endpoint: Create Razorpay Order
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const { amount, name, email, cardType, cardName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Valid amount is required.' });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret || key_id.includes('xxxx')) {
      return res.status(400).json({
        success: false,
        error: 'Razorpay API keys are not configured in .env file. Please enter RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.',
      });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    // Razorpay accepts amount in paise (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        cardType: cardType || 'pvc',
        cardName: cardName || 'PVC Card',
        customerName: name || '',
        customerEmail: email || '',
      },
    };

    const order = await razorpay.orders.create(options);
    console.log('💳 Razorpay Order Created:', order.id);

    return res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
    });
  } catch (error: any) {
    console.error('❌ Razorpay Order Creation Error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to create Razorpay Order.' });
  }
});

// 3. API Endpoint: Verify Razorpay Payment Signature & Save Order
app.post('/api/razorpay/verify-payment', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    message,
    cardType,
    cardName,
    originalPrice,
    discount,
    finalPrice,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing Razorpay payment verification parameters.' });
  }

  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET || '';
    const bodyData = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(bodyData.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.error('❌ Razorpay Payment Verification Failed for Order:', razorpay_order_id);
      return res.status(400).json({ success: false, error: 'Invalid payment signature. Verification failed.' });
    }

    console.log('✅ Razorpay Payment Signature Verified Successfully:', razorpay_payment_id);

    // Save paid order to MongoDB Atlas
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
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: 'paid',
    });
    await newPrebooking.save();
    console.log('💾 Paid order record saved in MongoDB Atlas:', newPrebooking._id);

    // Send Nodemailer notification email
    const transporter = await createTransporter();
    const selectedCardStr = cardName ? `${cardName} (₹${finalPrice})` : 'Smart NFC Card';

    const mailOptions = {
      from: `"OneWinq Store" <${process.env.SMTP_USER || 'alishabatham2@gmail.com'}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `🎉 [PAID ORDER] ${cardName || 'NFC Card'} Purchased by ${name}`,
      text: `New Paid Order Details:\n\nName: ${name}\nEmail: ${email}\nCard: ${selectedCardStr}\nPayment ID: ${razorpay_payment_id}\nOrder ID: ${razorpay_order_id}\nDelivery Address / Note: ${message || 'N/A'}\nMongoDB Record ID: ${newPrebooking._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #09070d; max-width: 520px; border: 1.5px solid #e4d8ec; border-radius: 16px; background: #FAF8FC;">
          <h2 style="color: #7b2cbf; margin-top: 0; font-size: 22px;">🎉 Payment Successful - New OneWinq Order</h2>
          <hr style="border: 0; border-top: 1px solid #e4d8ec; margin: 16px 0;" />
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7b2cbf;">${email}</a></p>
          <p style="background: #f3e8ff; padding: 12px; border-radius: 8px; color: #6b21a8; font-weight: bold;">Card Ordered: ${selectedCardStr}</p>
          <div style="background: #dcfce7; padding: 12px; border-radius: 8px; color: #15803d; margin: 12px 0;">
            <p style="margin: 0 0 4px 0;"><strong>💳 Payment ID:</strong> <code>${razorpay_payment_id}</code></p>
            <p style="margin: 0;"><strong>📦 Order ID:</strong> <code>${razorpay_order_id}</code></p>
          </div>
          <p><strong>Delivery Address / Note:</strong> ${message || 'N/A'}</p>
          <p style="font-size: 12px; color: #16a34a;">✅ Saved in MongoDB Atlas ID: <code>${newPrebooking._id}</code></p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Nodemailer order email sent:', info.messageId);
    } catch (mailErr) {
      console.error('⚠️ Could not send email notification, but payment was recorded:', mailErr);
    }

    return res.json({
      success: true,
      mongoId: newPrebooking._id,
      paymentId: razorpay_payment_id,
      message: 'Payment verified and order stored successfully!',
    });
  } catch (error: any) {
    console.error('❌ Payment verification error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Payment verification failed.' });
  }
});

// 4. API Endpoint: Contact Us Form (Stores in MongoDB Atlas & sends Email)
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
