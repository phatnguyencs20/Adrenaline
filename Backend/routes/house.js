const express = require('express');
const router = express.Router();

const User = require('../models/User');
const House = require('../models/House');
const Sensor = require('../models/Sensor');
const Device = require('../models/Device');

router.get('/users/:username/house', (req, res) => {
    User.findOne({ username: req.params.username })
        .populate('house')
        .then(user => res.json(user.house))
        .catch(err => res.status(404).json('There was no user with username ' + req.params.username + '!'));
});

router.get('/users/:username/house/rooms', (req, res) => {
    User.findOne({ username: req.params.username })
        .populate('house')
        .then(user => res.json(user.house.rooms))
        .catch(err => res.status(404).json('There was no user with username ' + req.params.username + '!'));
});

router.get('/users/:username/house/rooms/:roomname', (req, res) => {
    User.findOne({ username: req.params.username })
        .populate('house')
        .then(user => {
            const room = user.house.rooms.find(room => room.name === req.params.roomname);
            res.json(room);
        })
        .catch(err => res.status(404).json('There was no user with username ' + req.params.username + '!'));
});

module.exports = router;