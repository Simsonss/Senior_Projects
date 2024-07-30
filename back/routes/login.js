const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const User = require('../models/user')


// router.post("/",async (req, res) => {
//     const newGroup = await User.create(req.body);
//     res.status(200).json({"success":true})

// });

router.post("/",authController.handleLogin)

module.exports = router;