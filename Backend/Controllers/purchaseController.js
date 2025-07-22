import Purchase from '../models/Purchase.js';

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch purchases', error });
  }
};

// Add a new purchase (with gas and cylinder fields)
export const addPurchase = async (req, res) => {
  try {
    const {
      id,
      supplier,
      orderDate,
      expectedDelivery,
      total,
      status,
      notes,
      gasType,
      gasKg,
      gasPricePerKg,
      cylinderCount,
      cylinderPrice,
    } = req.body;

    const newPurchase = new Purchase({
      id,
      supplier,
      orderDate,
      expectedDelivery,
      total,
      status,
      notes,
      gasType,
      gasKg,
      gasPricePerKg,
      cylinderCount,
      cylinderPrice,
    });

    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create purchase', error });
  }
};

// Update an existing purchase
export const updatePurchase = async (req, res) => {
  try {
    const updated = await Purchase.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update purchase', error });
  }
};

// Delete a purchase
export const deletePurchase = async (req, res) => {
  try {
    await Purchase.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete purchase', error });
  }
};

// Approve a purchase
export const approvePurchase = async (req, res) => {
  try {
    const approved = await Purchase.findOneAndUpdate(
      { id: req.params.id },
      { status: 'approved' },
      { new: true }
    );

    if (!approved) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json(approved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve purchase', error });
  }
};
