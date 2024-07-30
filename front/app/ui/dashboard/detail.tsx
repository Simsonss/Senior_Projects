'use client';
import React from "react";
import { lusitana } from '@/app/ui/fonts';
import DeviceTable from '@/app/ui/dashboard/incident-table';
import { Suspense } from 'react';
interface IncidentDetailProps {
    devicesTemperature: any[];
    devicesHumidity:  any[];
    devicesAqi:  any[];
}

export default function IncidentDetail({ devicesTemperature, devicesHumidity, devicesAqi }: IncidentDetailProps) {
    console.log(devicesTemperature);
    
        
    return (
        <div className="w-full">
            <div className="w-full mt-10">
                <div className="bg-warning bg-cover inline-block p-2 items-center justify-center rounded mr-40 mb-5"> Temperature </div>
                <Suspense >
                    <DeviceTable devices={devicesTemperature} />
                </Suspense>
            </div>
            <div className="w-full mt-10">
                <div className="bg-warning bg-cover inline-block p-2 items-center justify-center rounded mr-40 mb-5"> Humidity </div>
                <Suspense >
                    <DeviceTable devices={devicesHumidity} />
                </Suspense>
            </div>
            <div className="w-full mt-10">
                <div className="bg-warning bg-cover inline-block p-2 items-center justify-center rounded mr-40 mb-5"> AQI </div>
                <Suspense >
                    <DeviceTable devices={devicesAqi} />
                </Suspense>
            </div>
        </div>
    );
}
