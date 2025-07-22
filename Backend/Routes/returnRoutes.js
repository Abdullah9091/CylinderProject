import express from 'express';
import { createReturn, getReturns, deleteReturn } from '../Controllers/returnController.js';

const router = express.Router();

router.post('/', createReturn);
router.get('/', getReturns);
router.delete('/:id', deleteReturn);

export default router;
