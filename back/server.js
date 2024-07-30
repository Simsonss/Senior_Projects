const dotenv = require('dotenv');
const app = require("./app");
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon')
const {PORT = 3000} = process.env;

console.log(PORT)
//connect to mongoDB
connectDB();



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});