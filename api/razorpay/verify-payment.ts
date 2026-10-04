import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { connectDB, Prebooking } from '../../server/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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
  } = req.body || {};

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
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: 'paid',
      });
      await newPrebooking.save();
      mongoId = newPrebooking._id.toString();
      console.log('💾 Paid order record saved in MongoDB Atlas:', mongoId);
    } catch (dbErr) {
      console.error('⚠️ Could not save to MongoDB Atlas (payment verified):', dbErr);
    }

    // Send Email notification to support@onewinq.com
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

    const selectedCardStr = cardName ? `${cardName} (₹${finalPrice})` : 'Smart NFC Card';

    const mailOptions = {
      from: `"OneWinq Store" <${smtpUser}>`,
      to: 'support@onewinq.com',
      replyTo: email,
      subject: `🎉 [PAID ORDER] ${cardName || 'NFC Card'} Purchased by ${name}`,
      text: `New Paid Order Details:\n\nName: ${name}\nEmail: ${email}\nCard: ${selectedCardStr}\nPayment ID: ${razorpay_payment_id}\nOrder ID: ${razorpay_order_id}\nDelivery Address / Note: ${message || 'N/A'}\nMongoDB Record ID: ${mongoId || 'N/A'}`,
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
          ${mongoId ? `<p style="font-size: 12px; color: #16a34a;">✅ Saved in MongoDB Atlas ID: <code>${mongoId}</code></p>` : ''}
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error('⚠️ Could not send email notification:', mailErr);
    }

    return res.status(200).json({
      success: true,
      mongoId,
      paymentId: razorpay_payment_id,
      message: 'Payment verified and order stored successfully!',
    });
  } catch (error: any) {
    console.error('❌ Vercel payment verification error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Payment verification failed.' });
  }
}
