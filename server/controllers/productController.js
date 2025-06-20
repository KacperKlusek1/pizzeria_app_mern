const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Nie znaleziono danej pizzy' });
    res.json(product);
};

exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usunięto pizze' });
};
