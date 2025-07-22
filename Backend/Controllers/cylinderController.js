import Cylinder from '../models/Cylinder.js';

export const createCylinder = async (req, res) => {
  try {
    const record = await Cylinder.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCylinders = async (req, res) => {
  try {
    const records = await Cylinder.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCylinder = async (req, res) => {
  try {
    await Cylinder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
