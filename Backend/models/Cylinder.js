import mongoose from 'mongoose';

const DepositSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  cylinderType: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  checkNumber: String,
  bankName: String,
});

const Cylinder = mongoose.model('Cylinder', DepositSchema);

export default Cylinder;
