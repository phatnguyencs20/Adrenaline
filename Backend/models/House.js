const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    rooms: [{
        name: {
            type: String,
            required: true,
        },
        sensor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sensor',
        },
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device',
        }
    }]
});

// Define pre('remove') hook to delete associated Sensor and Device documents
HouseSchema.pre('remove', async function(next) {
    try {
        for (const room of this.rooms) {
            if (room.sensor) {
                await Sensor.deleteOne({ _id: room.sensor });
            }
            if (room.device) {
                await Device.deleteOne({ _id: room.device });
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('House', HouseSchema);