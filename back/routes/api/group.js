const express = require('express');
const router = express.Router();
const Group=  require('../../models/group')
const Device =  require('../../models/device');
const { type } = require('os');

// router to get group data by collaboratorID
router.get('/', async (req, res) => {
    const collaboratorID = req.query.collaboratorID;
    try {
        const group = await Group.find({ collaboratorID: collaboratorID });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router to post new group
router.post('/', async (req, res) => {
    const data = req.body;
    try {
        const newGroup = await Group.create(data);
        res.status(201).json({ newGroup, message: "Group created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// router to get group data by groupID
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// router to add new collaborator to group
router.put('/collaborators', async (req, res) => {
    const collaboratorID = req.body.collaboratorID;
    const groupID = req.body.groupID;
    try {
        const group = await Group.findById(groupID);
        group.collaboratorID.push(collaboratorID);
        await group.save();
        res.status(201).json({group,"message":"add collaborator success"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//router to get all devices data in a group
router.get('/:id/devices', async (req, res) => {
    const groupID = req.params.id;
    try {
        const group = await Group.findById(groupID);
        const deviceID = group.deviceID;
        const devices = await Device.find({ _id: { $in: deviceID } });
        res.status(201).json(devices);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


//router to add new device from group
router.post('/:id/devices', async (req, res) => {
    const groupID = req.params.id;
    const devices = req.body;
    console.log(req.body);
    try {
        //update deviceID in group
        const group = await Group.findById(groupID);
        if(devices[0] == 'a'){
            //get all device groupID == null
            const allDevice = await Device.find({groupID:null});
            for (let i = 0; i < allDevice.length; i++) {
                const device = allDevice[i];
                group.deviceID.push(device._id);
                await group.save();
                device.groupID = groupID;
                await device.save();
            }
        }
        else{
            for (let i = 0; i < devices.length; i++) {
                const device = await
                Device.findById(devices[i]);
                group.deviceID.push(device._id);
                await group.save();
                device.groupID = groupID;
                await device.save();
            }
        }
        res.status(201).json({group,"message":"add device success"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;