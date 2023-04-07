const mongoose = require('mongoose');
const SensorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    data: [{
        timestamp: {
            type: Date,
            required: true,
        },
        temperature: {
            type: Number,
            required: true,
        },
        humidity: {
            type: Number,
            required: true,
        }
    }]
});

module.exports = mongoose.model('Sensor', SensorSchema);