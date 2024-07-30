'use client';
import React from "react";
import { lusitana } from '@/app/ui/fonts';
import { renderBattery,statusColorMap,renderSensorData,renderConectedGroup} from "@/app/ui/devices/data";
import {Chip} from "@nextui-org/react";
export default function DeviceDetail({ device}: { device: any }) {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mt-5">
                <h1 className={`${lusitana.className} text-2xl`}>{device.name}</h1>
            </div>
            <div className="mt-3">Description: {device.description}</div>
            <div className="mt-3 ">Location: {device.location}</div> 
            <div className="flex flex-wrap items-center space-x-4 mt-3">
                <div>Battery:</div>     
                <div className="w-24 ">
                    <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
                    <div className="border-r-4 h-3 rounded-r absolute flex border-gray-400 ml-12 mt-1 z-10"></div>
                    <div
                        className={`cursor-default bg-${renderBattery(Number(device.battery))} text-xs font-bold leading-none flex items-center justify-center m-0.5 py-2 text-center text-white`}
                        style={{ width: `${device.battery}%`, height: "3px" }}
                    >
                        <div className="absolute left-0 right-0 mx-auto text-gray-700">{device.battery}%</div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-3 "> 
                <div>Status:</div> 
                <Chip className="capitalize" color={statusColorMap[device.status]} size="sm" variant="flat">
                    {device.status}
                </Chip>          
            </div>
            <div>
                {renderConectedGroup(device.groupID)}
            </div>
            <div className="flex w-full items-center justify-between mt-5 mb-3">
                <h1 className={`${lusitana.className} text-2xl`}>Sensor</h1>
            </div>  
            <div>
                {device.sensor.map((item: any) => (
                    <div key={item.id}>
                        {renderSensorData(item)}
                    </div>
                ))}
            </div>
        </div>
    );
}
