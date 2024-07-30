'use client';
import React from "react";
import { lusitana } from '@/app/ui/fonts';
import {Chip} from "@nextui-org/react";
import { statusColorMap } from "../devices/data";
export default function GroupDetail({group}: { group: any }) {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mt-5">
                <h1 className={`${lusitana.className} text-2xl`}>{group.name}</h1>
            </div>
            <div className="mt-3">Description: {group.description}</div>
            <div className="mt-3 ">Location: {group.location}</div> 
            <div className="flex items-center space-x-4 mt-3 "> 
                <div>Status:</div> 
                <Chip className="capitalize" color={statusColorMap[group.status]} size="sm" variant="flat">
                    {group.status}
                </Chip>          
            </div>
        </div>
    );
}
