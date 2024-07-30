const User = require('../models/user')

const handleNewUser = async (req, res) => {
    try {
        const newGroup = await User.create(req.body);
        res.status(200).json({"success":true})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


// module.exports = (req, res) => {
//     User.create(req.body).then(() => {
//         console.log("User registered successfully!")
//     }).catch((error) => {
//         console.log(error.errors)
//     }m)
// } 

module.exports = {handleNewUser};