import { unstable_noStore as noStore, unstable_cache } from 'next/cache';


//function to fetch device data form 3rd party API by owner id
export async function fetchDeviceDataByOwnerId(ownerId: string) {
    noStore();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/devices?ownerId=${ownerId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
}

//function to fetch device data form 3rd party API by owner id and dont have group yet
export async function fetchDeviceDataByOwnerIdAndNoGroup(ownerId: string) {
    noStore();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/devices?ownerId=${ownerId}&group=false`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
}


// function to fetch device data in group form 3rd party API
export async function fetchDeviceDataInGroup(groupId: string) {
    noStore();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/groups/${groupId}/devices`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching device data:', error);
        throw error;
    }
}


// function to fetch device data form 3rd party API
export async function fetchMyData(path: string): Promise<any> {
    noStore();
    const OWNER_ID = "65b687919a9b69eb2749c3d4";
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/me/${OWNER_ID + path}`);
            const data = await res.json();
            resolve(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            reject(error);
        }
    });
}


// function to fetch device data form 3rd party API
export async function fetchDataById(path:string,id: string) {
    noStore();
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + path + id);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching  data:', error);
        throw error;
    }
}


//function post data by path
export async function postData(path:string,data:any) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +  path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        console.error(`Error posting ${path} data:`, error);
        throw error;
    }
}


export async function postNewDeviceToGroup(groupId:string, data: any) {
    noStore();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/groups/${groupId}/devices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const response = await res.json();
        return response;
    } catch (error) {
        console.error('Error posting new device to group:', error);
        throw error;
    }
}



//api to fecth location data form latutude and longitude
export async function fetchLocationData(latitude: number, longitude: number) {
    noStore();
    try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
}

//api to fecth location data form latutude and longitude
