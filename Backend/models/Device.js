const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    data: [{
        timestamp: {
            type: Date,
            required: true,
        },
        fanSpeed: {
            type: Number,
            required: true,
        },
        light: {
            type: Boolean,
            required: true,
        }
    }]
});

module.exports = mongoose.model('Device', DeviceSchema);