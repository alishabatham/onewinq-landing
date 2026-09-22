import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alishabatham2_db_user:jCmP00rPLuqyLE0h@cluster0.lahalx4.mongodb.net/?appName=Cluster0';

let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const opts = {
      bufferCommands: false,
    };

    await mongoose.connect(MONGODB_URI, opts);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
  }
}

// Pre-booking Schema & Model
const PrebookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  cardType: { type: String, default: 'pvc' },
  cardName: { type: String, default: 'PVC Card' },
  originalPrice: { type: Number },
  discount: { type: Number },
  finalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const Prebooking = mongoose.models.Prebooking || mongoose.model('Prebooking', PrebookingSchema);

// Contact Us Schema & Model
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
