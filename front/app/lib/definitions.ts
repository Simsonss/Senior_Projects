export type Device = {
    id: string;
    name: string;
    description: string;
    location: string;
    latitude: number;
    longtitude: number;
};

export type Group = {
    id: string;
    ownerID: string;
    name: string;
    description: string;
    location: string;
};

export type DeviceTableForm = {
    _id: string;
    name: string;
    status: string;
    battery: number;
    jwt: string;
};

export type GroupTableForm = {
    _id: string;
    name: string;
    location: string;
    description: number;
    status: string;
};

// const GroupSchema = new mongoose.Schema({
//     ownerID: {
//         type: mongoose.Schema.ObjectId,
//         required: [true, "Must has a creatorID"],
//       },
//     collaboratorID:{type:Array},
//     name:{type:String, required: [true, "Group must has a name"]},
//     location : { type: String,require: true , default: ""},
//     description:{type:String, require: true ,default:""},
//     deviceID :{type:Array, required: true,default:[]},
//     status: { type: String, enum: ['active', 'inactive'], default: 'active' }
// })