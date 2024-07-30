const express = require('express');
const router = express.Router();
const Device =  require('../../models/device');
const Group=  require('../../models/group')
const User = require('../../models/user');


//get my user data
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId); 
        console.log(user);
        const config = user.configuration;
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

//update configuration
router.patch('/:id/configuration', async (req, res) => {
    const userId = req.params.id;
    try {
        const newConfig = req.body;
        const updateUser = await User.findByIdAndUpdate
        (userId, { configuration: newConfig }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

//update my user data
router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const newData = req.body;
        const updateUser = await User.findByIdAndUpdate(userId, newData, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

//get devices data by ownerID
router.get('/:id/devices', async (req, res) => {
    const ownerId = req.params.ownerid;
    try {
        const devices = await Device.find({ ownerId: ownerId });
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get devices data by ownerID that not have group yet
router.get('/:id/devices/ungroup', async (req, res) => {
    const ownerId = req.params.ownerid;
    try {
        const devices = await Device.find({ ownerId: ownerId, groupID: null });
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get groups data by ownerID
router.get('/:id/groups', async (req, res) => {
    const ownerId = req.params.ownerid;
    try {
        const groups = await Group.find({ ownerId: ownerId });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get devices data by configuration
router.get('/:id/devices/configuration', async (req, res) => {
    const ownerId = req.params.ownerid;
    try {
        const user = await User.findById(req.params.id);
        const temperatureConfig = user.configuration[0];
        const humidityConfig = user.configuration[1];
        const aqiConfig = user.configuration[2];
        const temperatureMax = temperatureConfig.maximum;
        const temperatureMin = temperatureConfig.minimum;
        const humidityMax = humidityConfig.maximum;
        const humidityMin = humidityConfig.minimum;
        const aqiMax = aqiConfig.maximum;
        const aqiMin = aqiConfig.minimum;

        console.log(temperatureMax, temperatureMin, humidityMax, humidityMin, aqiMax, aqiMin);

        const devices = await Device.find({ ownerId: ownerId });

        const devicesTemperature = devices.filter(device => {
            const temperatureSensor = device.sensor.find(s => s.name === 'Temperature');
            return temperatureSensor && temperatureSensor.value >= temperatureMin && temperatureSensor.value <= temperatureMax;
        });

        const devicesHumidity = devices.filter(device => {
            const humiditySensor = device.sensor.find(s => s.name === 'Humidity');
            return humiditySensor && humiditySensor.value >= humidityMin && humiditySensor.value <= humidityMax;
        });

        const devicesAqi = devices.filter(device => {
            const aqiSensor = device.sensor.find(s => s.name === 'AQI');
            return aqiSensor && aqiSensor.value >= aqiMin && aqiSensor.value <= aqiMax;
        });

        res.status(200).json({ devicesTemperature, devicesHumidity, devicesAqi });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;