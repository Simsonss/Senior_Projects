const mongoose = require("mongoose");

// Sensor Schema
const SensorSchema = new mongoose.Schema({
  name:{type:String,required: true},
  value:{type:Number,default:0},
  unit:{type: String, required: true},
})

// User Schema
const DeviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description : { type: String,require: true , default: ""},
    location : { type: String,require: true , default: ""},
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    latitude:{type:Number,default:null},
    longtitude:{type:Number,default:null},
    sensor:{type: [SensorSchema],require: true ,default:[]},
    ownerID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Must has a creatorID"],
      },
    lastupdate:{type: Date, default: Date.now},
    battery:{type:Number,default:0},
    groupID: {
        type: mongoose.Schema.ObjectId,
        default: null,
      },
    jwt:{type:String, required: true},
})


const Device = mongoose.model("Device", DeviceSchema)

module.exports = Device
