const Order = require('../models/Order');
const User = require("../models/User");

exports.createOrder = async (req, res) => {
    try {
        const { fullName, contactInfo, address, pizzas } = req.body;
        if (!fullName || !contactInfo || !address || !pizzas || !Array.isArray(pizzas)) {
            return res.status(400).json({ message: 'Brak wymaganych danych zamówienia lub niewłaściwy format.' });
        }

        const userId = req.user?._id || null;

        const newOrder = new Order({
            fullName,
            contactInfo,
            address,
            pizzas,
            userId
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Błąd przy tworzeniu zamówienia:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        const orders = await Order.find({ userId: user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotReadyOrders = async (req, res) => {
    try {
        const count = await Order.countDocuments({ status: { $ne: 'ready' } });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Nie znaleziono zamówienia' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Nie znaleziono zamówienia' });
        }

        res.json({ message: 'Zamówienie anulowane pomyślnie' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};