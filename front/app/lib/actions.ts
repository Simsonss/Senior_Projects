'use server';
import {z} from 'zod';
import {postData,postNewDeviceToGroup} from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import exp from 'constants';



//function to generate jwtToken 8 alphanumeric characters
function generateJwtToken() {
    const jwtToken = Math.random().toString(36).substring(2, 10);
    return jwtToken;
}


const ownerID = "65b687919a9b69eb2749c3d4";

//validate data type
const DeviceSchema = z.object({
    id: z.string(),
    ownerID: z.string(),
    name: z.string(),
    description: z.string(),
    location: z.string(),
    jwt: z.string(),
});


const GroupSchema = z.object({
    id: z.string(),
    ownerID: z.string(),    
    name: z.string(),
    description: z.string(),
    location: z.string(),
});

const ConfigSchema = z.object({
    id: z.string(),
    TemperatureMin: z.string(),
    TemperatureMax: z.string(),
    HumidityMin: z.string(),
    HumidityMax: z.string(),
    AQIMin: z.string(),
    AQIMax: z.string(),
});

// export type Group = {
//     id: string;
//     ownerID: string;
//     name: string;
//     description: string;
//     location: string;
// };
//end of validate data type



const CreateDevice= DeviceSchema.omit({ id: true,ownerID:true,jwt: true});
const CreateGroup = GroupSchema.omit({ id: true,ownerID: true});
const CreateConfig = ConfigSchema.omit({id:true});


export async function createDevice(formdata: FormData) {
    //validate data type
    const { name, description, location } = CreateDevice.parse({
        name: formdata.get('name'),
        description: formdata.get('description'),
        location: formdata.get('location'),
    });
    const jwtToken = generateJwtToken();

    const data = {
        name,
        description,
        location,
        ownerID: ownerID,
        jwt: jwtToken,
    };
    
    await postData('/devices',data);
    revalidatePath('/dashboard/devices');
    redirect('/dashboard/devices');
}

export async function createGroup(formdata: FormData) {
    //validate data type
    const { name, description, location } = CreateGroup.parse({
        name: formdata.get('name'),
        description: formdata.get('description'),
        location: formdata.get('location'),
    });

    const data = {
        name,
        description,
        location,
        ownerID: ownerID,
    };
    
    await postData('/groups',data);
    revalidatePath('/dashboard/groups');
    redirect('/dashboard/groups');
}
export async function createConfig(formdata: FormData) {
    //validate data type
    const { TemperatureMin, TemperatureMax, HumidityMin, HumidityMax, AQIMin, AQIMax } = CreateConfig.parse({
        TemperatureMin: formdata.get('TemperatureMin'),
        TemperatureMax: formdata.get('TemperatureMax'),
        HumidityMin: formdata.get('HumidityMin'),
        HumidityMax: formdata.get('HumidityMax'),
        AQIMin: formdata.get('AQIMin'),
        AQIMax: formdata.get('AQIMax'),
    });

    const data = {
        TemperatureMin,
        TemperatureMax,
        HumidityMin,
        HumidityMax,
        AQIMin,
        AQIMax,
    };


    
    await postData('/config',data);
    revalidatePath('/dashboard');
    redirect('/dashboard');
}


export async function addDeviceToGroup(groupID:string,data: any) { 
    await postNewDeviceToGroup(groupID, data);
    revalidatePath(`/dashboard/groups/${groupID}`);
    redirect(`/dashboard/groups/${groupID}`)
}