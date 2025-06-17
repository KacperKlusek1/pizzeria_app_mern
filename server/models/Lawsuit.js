const mongoose = require('mongoose');

const lawsuitSchema = new mongoose.Schema({
    plaintiff: { type: String, required: true },
    caseNumber: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    documents: [String],
    status: {
        type: String,
        enum: ['oczekuje', 'rozpatrzany', 'odrzucony', 'załatwiony polubownie', 'sprawa w toku'],
        default: 'oczekuje'
    },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
});
module.exports = mongoose.model('Lawsuit', lawsuitSchema);
