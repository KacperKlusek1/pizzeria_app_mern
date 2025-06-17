const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, enum: ['Mała', 'Familijna', 'Imprezowa'], required: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    address: { type: String, required: true },
    pizzas: [orderItemSchema],
    status: {
        type: String,
        enum: ['waiting', 'prepared', 'ready'],
        default: 'waiting'
    },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Order', orderSchema);