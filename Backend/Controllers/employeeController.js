import Employee from '../models/Employee.js';

export const addEmployee = async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    const saved = await newEmp.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving employee:', error);
    res.status(500).json({ message: 'Server error while saving employee' });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee' });
  }
};
