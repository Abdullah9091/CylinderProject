import Purchase from '../models/Purchase.js';

export const getPurchases = async (req, res) => {
  const purchases = await Purchase.find();
  res.json(purchases);
};

export const addPurchase = async (req, res) => {
  const purchase = new Purchase(req.body);
  await purchase.save();
  res.status(201).json(purchase);
};

export const updatePurchase = async (req, res) => {
  const updated = await Purchase.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deletePurchase = async (req, res) => {
  await Purchase.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Deleted' });
};

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
    res.status(500).json({ message: error.message });
  }
};
