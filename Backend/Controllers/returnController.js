import Return from '../models/Return.js';

// CREATE return
export const createReturn = async (req, res) => {
  try {
    const newReturn = await Return.create(req.body);
    res.status(201).json(newReturn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ all returns
export const getReturns = async (req, res) => {
  try {
    const allReturns = await Return.find();
    res.status(200).json(allReturns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE return
export const deleteReturn = async (req, res) => {
  try {
    await Return.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Return deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
