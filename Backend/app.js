import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import customerRoutes from './Routes/CustomerRoute.js';
import supplierRoutes from './Routes/supplierRoutes.js';
import purchaseRoutes from './Routes/purchases.js';
import cylinderRoutes from './Routes/cylinderRoutes.js';
import refillRoutes from './Routes/refillRoutes.js';
import returnRoutes from './Routes/returnRoutes.js';
import saleRoutes from './Routes/saleRoutes.js';
import employeeRoutes from './Routes/employeeRoutes.js';





dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/cylinders', cylinderRoutes);
app.use('/api/refills', refillRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/employees', employeeRoutes);








// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
