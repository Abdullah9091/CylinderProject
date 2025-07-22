import express from 'express';
import {
  createRefill,
  getAllRefills,
  updateRefill,
  deleteRefill,
} from '../controllers/refillController.js';

const router = express.Router();

router.post('/', createRefill);
router.get('/', getAllRefills);
router.put('/:id', updateRefill);
router.delete('/:id', deleteRefill);

export default router;
