import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { amount, name, email, cardType, cardName } = req.body || {};

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Valid amount is required.' });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret || key_id.includes('xxxx')) {
      return res.status(400).json({
        success: false,
        error: 'Razorpay API keys are not configured in environment variables yet. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
      });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

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

    return res.status(200).json({
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
}
