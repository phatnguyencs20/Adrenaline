const express = require('express');
const router = express.Router();

const User = require('../models/User');
const House = require('../models/House');
const Sensor = require('../models/Sensor');
const Device = require('../models/Device');

router.get('/users', (req, res) => {
    User.find({}, { password: 0, __v: 0 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json('Seem like no one is here!'));
});

router.get('/users/:username', (req, res) => {
    User.findOne({ username: req.params.username }, { password: 0, __v: 0 })
        .then(user => res.json(user))
        .catch(err => res.status(404).json('There was no user with username ' + req.params.username + '!'));
});

//under revision
router.post('/users', async (req, res) => {
    try {
        const { username, password, name, email, address } = req.body;

        const newSensor = new Sensor({
            name: "temperature",
            data: []
        });
        await newSensor.save();

        const newDevice = new Device({
            name: "fan",
            data: []
        });
        await newDevice.save();

        let newHouse = new House({
            address,
            rooms: [
                {
                    name: 'livingroom',
                    sensor: newSensor._id,
                    device: newDevice._id,
                },
                {
                    name: 'bedroom',
                }
            ],
        });
        await newHouse.save();

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            hashedPassword,
            name,
            email,
            house: newHouse._id,
        });
        await newUser.save();

        res.status(201).json({ message: 'User with username ' + username + ' added successfully!' });
    } catch (error) {
        res.status(409).json({ message: error });
    }
});

router.patch('/users/:username', async (req, res) => {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
        return res.status(422).json({ error: 'Missing required fields: name, email, address!' });
    }
    User.findOneAndUpdate({ username: req.params.username }, { name, email, address })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: `User not found with username: ${req.params.username}.` });
            }
            res.json({ message: 'Information updated successfully!' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.patch('/users/:username/name', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(422).json({ error: 'Missing required fields: name!' });
    }
    User.findOneAndUpdate({ username: req.params.username }, { name })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: `User not found with username: ${req.params.username}.` });
            }
            res.json({ message: 'Name updated successfully!' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.patch('/users/:username/email', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(422).json({ error: 'Missing required fields: email!' });
    }
    User.findOneAndUpdate({ username: req.params.username }, { email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: `User not found with username: ${req.params.username}.` });
            }
            res.json({ message: 'Email updated successfully!' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

//under revision
router.delete('/users', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).populate('house');
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const houseId = user.house._id;

        await User.deleteOne({ username: req.body.username });

        if (houseId) {
            await House.deleteOne({ _id: houseId });
        }

        return res.json({ message: 'User deleted successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error!' });
    }
});

module.exports = router;