const path = require('path')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
require('dotenv').config({path:__dirname+'/../.env'});
const { SECRET = "secret" } = process.env;

console.log(SECRET);

const handleLogin = async(req,res) => {
    const {email ,password} = req.body
    // try {
        // check if the user exists
        const user = await User.findOne({ email: email });
        if (user) {
          //check if password matches
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            loginstatus = true;
            if(loginstatus == true){
                // sign token and send it in response
                const token = await jwt.sign({ email: user.email,userID:user._id,role:user.role,displayname:user.displayname}, SECRET);
                const roles = user.role;
                res.json({ token ,"role":roles,"message": "Login successfully.","success":true});
                return;
            }else{
                res.status(400).json({ "message": "You've been banned.","banuntil":user.expiration,"banreason" : user.banreason ,"success":false});
                return;
            }
    
          } else {
            res.status(400).json({ "message": "Email or password doesn't match." ,"success":false});
          }
        } else {
          res.status(400).json({ "message": "Email or password doesn't match." ,"success":false});
        }
    //   } catch (error) {
    //     res.status(400).json({  "message":"Internal Server Error." ,"success":false});
    //   }
}

module.exports = {handleLogin}