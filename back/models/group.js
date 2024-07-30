const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// User Schema
// const GroupSchema = new mongoose.Schema({
//     collaboratorID:{type:Array},
//     deviceID :{type:Array, required: true},
//     status:{type: Boolean, default: false}
// })

// group Schema
const GroupSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Must has a creatorID"],
      },
    collaboratorID:{type:Array},
    name:{type:String, required: [true, "Group must has a name"]},
    location : { type: String,require: true , default: ""},
    description:{type:String, require: true ,default:""},
    deviceID :{type:Array, required: true,default:[]},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
})




const Group = mongoose.model("Group", GroupSchema)

module.exports = Group
