import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  cylinderType: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMethod: { type: String },
  returnDate: { type: String, required: true },
});

const Return = mongoose.model('Return', returnSchema);

export default Return;
