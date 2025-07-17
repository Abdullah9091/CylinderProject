import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  id: String,
  supplier: String,
  orderDate: String,
  expectedDelivery: String,
  total: String,
  status: { type: String, default: 'pending' },
  notes: String
});

export default mongoose.model('Purchase', purchaseSchema);
