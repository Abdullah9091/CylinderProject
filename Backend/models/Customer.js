import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  trn: String,
  phone: String,
  email: String,
  totalPurchases: Number,
  outstanding: Number,
  lastPurchase: String,
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
