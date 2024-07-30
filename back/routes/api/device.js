const express = require('express');
const router = express.Router();
const Device =  require('../../models/device');

// router to get devices data by ownerID
router.get('/', async (req, res) => {
    try {
        const ownerID = req.query.ownerID;
        const devices = await Device.find({ ownerID: ownerID });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router to post new device
router.post('/', async (req, res) => {
    const device = req.body;
    try {
        const newDevice = await Device.create(device);
        res.status(201).json(newDevice);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "message": error.message });
    }
});

// router to get devices data by deviceID
router.get('/:id', async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.json(device);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router to update devices data by deviceID
router.patch('/:id', async (req, res) => {
    try {
        const newData = req.body;
        const updatedDevice = await Device.findByIdAndUpdate(req.params.id, newData, { new: true });
        resstatus(200).json(updatedDevice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// router to delete devices data by deviceID
router.delete('/:id', async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        await device.remove();
        res.json({ message: "Device deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router to update device data by jwtToken
router.patch('/jwt/:jwt', async (req, res) => {
    try {
        const jwtToken = req.params.jwt;
        const newData = req.body;

        // Check if sensor status is provided, if not, set it to 'active'
        if (newData.sensor) {
            newData.sensor.forEach(sensor => {
                if (!sensor.status) {
                    sensor.status = 'active';
                }
            });
        }

        const updatedDevice = await Device.findOneAndUpdate({ jwtToken: jwtToken }, newData, { new: true });
        res.json(updatedDevice);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});




module.exports = router;

// const DeviceSchema = new mongoose.Schema({
//     location:{type:Object, required: true},
//     sensor:{type:Array,default:[]},
//     status:{type: Boolean, default: false},
//     createAt: {type: Date, default: Date.now},
//     createdBy: {
//         type: mongoose.Schema.ObjectId,
//         required: [true, "Collaborator must has a creatorID"],
//       }
// })