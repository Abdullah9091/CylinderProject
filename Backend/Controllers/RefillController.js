import Refill from '../models/Refill.js';

export const createRefill = async (req, res) => {
  try {
    const newRefill = new Refill(req.body);
    await newRefill.save();
    res.status(201).json(newRefill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRefills = async (req, res) => {
  try {
    const refills = await Refill.find();
    res.status(200).json(refills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRefill = async (req, res) => {
  try {
    const updated = await Refill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRefill = async (req, res) => {
  try {
    await Refill.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
