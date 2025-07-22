// routes/employeeRoutes.js
import express from 'express';
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee
} from '../Controllers/employeeController.js';

const router = express.Router();

router.get('/', getEmployees);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
