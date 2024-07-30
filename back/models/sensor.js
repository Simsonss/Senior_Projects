const mongoose = require("mongoose");

// User Schema
const SensorSchema = new mongoose.Schema({
    deviceid:{type:mongoose.Schema.ObjectId,required: true},
    name:{type:String,required: true},
    value:{type:Number,default:0},
    unit:{type: String, required: true},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
})


const Sensor = mongoose.model("Sensor", SensorSchema)

module.exports = Sensor
