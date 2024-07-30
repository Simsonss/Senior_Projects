const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerControllers');


// router.post("/",async (req, res) => {
//     const newGroup = await User.create(req.body);
//     res.status(200).json({"success":true})

// });

router.post("/",registerController.handleNewUser)

module.exports = router;