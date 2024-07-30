const path = require('path')
require('dotenv').config({path:__dirname+'/../.env'})
const mongoose = require("mongoose") //import fresh mongoose object
// const {DATABASE_URI,DATA_TEST} = process.env 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_TEST, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB

// CONNECTION EVENTS
// mongoose.connection
// .on("open", () => log.green("DATABASE STATE", "Connection Open"))
// .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
// .on("error", (error) => log.red("DATABASE STATE", error))

// EXPORT CONNECTION


