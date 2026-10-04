import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { connectDB, Prebooking } from './server/db';

dotenv.config();

// Vite Plugin to handle API endpoints during development
function apiPlugin(): Plugin {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || '';

        // Endpoint: /api/razorpay/create-order
        if (rawUrl === '/api/razorpay/create-order' || rawUrl.startsWith('/api/razorpay/create-order')) {
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
            } catch (e) {}

            try {
              const { amount, name, email, cardType, cardName } = payload;
              const key_id = process.env.RAZORPAY_KEY_ID;
              const key_secret = process.env.RAZORPAY_KEY_SECRET;

              if (!key_id || !key_secret || key_id.includes('xxxx')) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Razorpay API keys are not configured in .env file yet. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.',
                  })
                );
              }

              const razorpay = new Razorpay({ key_id, key_secret });
              const options = {
                amount: Math.round((amount || 400) * 100),
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
              console.log('💳 Vite Dev Server: Created Razorpay Order:', order.id);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({
                  success: true,
                  orderId: order.id,
                  amount: order.amount,
                  currency: order.currency,
                  keyId: key_id,
                })
              );
            } catch (err: any) {
              console.error('❌ Vite Dev Server Razorpay Create Order Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: err?.message || 'Failed to create Razorpay Order.' }));
            }
          });
          return;
        }

        // Endpoint: /api/razorpay/verify-payment
        if (rawUrl === '/api/razorpay/verify-payment' || rawUrl.startsWith('/api/razorpay/verify-payment')) {
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
            } catch (e) {}

            try {
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
              } = payload;

              const key_secret = process.env.RAZORPAY_KEY_SECRET || '';
              const bodyData = razorpay_order_id + '|' + razorpay_payment_id;
              const expectedSignature = crypto
                .createHmac('sha256', key_secret)
                .update(bodyData.toString())
                .digest('hex');

              if (expectedSignature !== razorpay_signature) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: 'Invalid payment signature verification.' }));
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
                console.log('💾 Vite Dev Server: Paid order saved to MongoDB Atlas:', mongoId);
              } catch (dbErr) {
                console.error('⚠️ DB Save error:', dbErr);
              }

              // Send Nodemailer Email
              const smtpUser = process.env.SMTP_USER || 'alishabatham2@gmail.com';
              const rawPass = process.env.SMTP_PASS || 'lkgmbcgdvnwiczbe';
              const smtpPass = rawPass.replace(/\s+/g, '');

              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: smtpUser, pass: smtpPass },
              });

              const selectedCardStr = cardName ? `${cardName} (₹${finalPrice})` : 'Smart NFC Card';

              try {
                await transporter.sendMail({
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
                });
              } catch (mErr) {
                console.error('⚠️ Could not send email notification:', mErr);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, mongoId, paymentId: razorpay_payment_id }));
            } catch (err: any) {
              console.error('❌ Vite Dev Server Payment Verify Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: false, error: err?.message || 'Payment verification failed.' }));
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
  plugins: [react(), apiPlugin()],
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
