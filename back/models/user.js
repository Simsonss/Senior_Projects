const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// User Schema

const ConfigeSchema = new mongoose.Schema({
    name:{type:String,default:true},
    minimum:{type:Number,default:null},
    maximum:{type: Number, default: null},
    unit:{type: String, default: ""}
  })

const UserSchema = new mongoose.Schema({
    email :{type: String, unique: true,
        require: [true , 'Please provide email']},
    displayname: {type: String, unique: true, 
        required: [true , 'Please provide display name']},
    password: {type: String, 
        required: [true , 'Please provide password']},
    role: {type: Number,default: 1},        
    date: {type: Date, default: Date.now},
    configuration : {type:[ConfigeSchema] , require:true,default:[{
        name: "Temperature",
        minimum: null,
        maximum: null,
        unit: '°C'
    },
    {
        name: "Humidity",
        minimum: null,
        maximum: null,
        unit: 'Percentage'
    },
    {
        name: "AQI",
        minimum: null,
        maximum: null,
        unit:'US AQI'
    }
]},
})

UserSchema.pre('save', function(next) {
    const user = this ;

    bcrypt.hash(user.password,10).then(hash => {
        user.password = hash
        next()
    }).catch(err => {
        console.error(err)
    })
})



const User = mongoose.model("User", UserSchema)
module.exports = User
