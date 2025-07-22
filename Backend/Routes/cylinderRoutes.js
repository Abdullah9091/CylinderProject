import express from 'express';
import {
  createCylinder,
  getAllCylinders,
  deleteCylinder,
} from '../Controllers/cylinderController.js';

const router = express.Router();

router.post('/', createCylinder);
router.get('/', getAllCylinders);
router.delete('/:id', deleteCylinder);

export default router;
