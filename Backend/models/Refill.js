import mongoose from 'mongoose';

const refillSchema = new mongoose.Schema({
  customer: String,
  cylinderType: String,
  quantity: Number,
  date: String,
  price: Number,
  type: { type: String, default: 'refill' }
});

const Refill = mongoose.model('Refill', refillSchema);
export default Refill;
