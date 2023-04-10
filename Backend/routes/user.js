const express = require('express');
const router = express.Router();

const User = require('../models/User');

// router.get('/users', (req, res) => {
//     User.find({}, { password: 0, __v: 0 })
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         });
// });

router.get('/users', (req, res) => {
    const { username, password } = req.query;
    User.findOne({ username, password }, { firstName: 1, adafruitIOUsername: 1, adafruitIOKey: 1, _id: 0 })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post('/users', (req, res) => {
    const { username, password, firstName, lastName, adafruitIOUsername, adafruitIOKey } = req.body;
    User.findOne({ username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const user = new User({
                username,
                password,
                firstName,
                lastName,
                adafruitIOUsername,
                adafruitIOKey
            });
            return user.save();
        })
        .then(savedUser => {
            return res.status(201).json({ message: 'User created successfully', user: savedUser });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});



module.exports = router;