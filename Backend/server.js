const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const user = require('./routes/user');

const app = express();
const port = process.env.PORT || 8888;
app.use(cors());
app.use(express.json());

app.use('/', user);

const url = process.env.MONGODB_URL;
mongoose.connect(url);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
app.listen(port, () => {
    console.log('This night is dark and full of terrors');
});