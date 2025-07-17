import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import customerRoutes from './Routes/CustomerRoute.js';
import supplierRoutes from './Routes/supplierRoutes.js';
import purchaseRoutes from './Routes/purchases.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/purchases', purchaseRoutes);



mongoose.connect(process.env.MONGO_URI, {

  // useNewUrlParser: true,
  // useUnifiedTopology: true,

}).then(() => {

  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(err => console.log(err));
