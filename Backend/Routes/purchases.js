import express from 'express';
import {
  getPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase,
  approvePurchase,
} from '../Controllers/purchaseController.js';

const router = express.Router();

router.get('/', getPurchases);
router.post('/', addPurchase);
router.patch('/:id', updatePurchase);
router.delete('/:id', deletePurchase);
router.patch('/:id/approve', approvePurchase); 

export default router;
