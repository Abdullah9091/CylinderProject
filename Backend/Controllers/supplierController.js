import Supplier from '../models/Supplier.js';

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

export const addSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add supplier' });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const updated = await Supplier.findOneAndUpdate(
      { id: req.params.id }, 
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Supplier not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update supplier' });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const deleted = await Supplier.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Supplier not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};
