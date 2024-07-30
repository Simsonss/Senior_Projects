'use client';
import React from "react";
import {Chip, Tooltip, ChipProps} from "@nextui-org/react";
import {
DocumentDuplicateIcon, 
PencilSquareIcon, 
TrashIcon, 
EyeIcon,
} from '@heroicons/react/24/outline';
import { HumidityIcon,TemperetureIcon,DustIcon } from "@/app/ui/Icon";
import { DeviceTableForm } from "@/app/lib/definitions";
import Link from "next/link";

export const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  inactive: "danger",
};


const batteryColorMap: Record<string, ChipProps["color"]> = {
  high: "success",
  medium: "warning",
  low: "danger",
};

export const renderBattery = (battery: number) => {
  let color: ChipProps["color"] = "default";
  if (battery >= 70) {
    color = batteryColorMap["high"];
  } else if (battery >= 30) {
    color = batteryColorMap["medium"];
  } else {
    color = batteryColorMap["low"];
  }
  return (
    color
  );
};

const temperatureColorMap: Record<string, string> = {
  0: "bg-temperatureVeryCold",
  10: "bg-temperatureCold",
  20: "bg-temperatureModerate",
  30: "bg-temperatureWarm",
  40: "bg-temperatureHot",
};

export const renderTemperatureColor = (temperature: number) => {
  let color: string;
  if (temperature <= 0) {
    color = temperatureColorMap[0];
  } else if (temperature <= 10) {
    color = temperatureColorMap[10];
  } else if (temperature <= 20) {
    color = temperatureColorMap[20];
  } else if (temperature <= 30) {
    color = temperatureColorMap[30];
  } else {
    color = temperatureColorMap[40];
  }
  return color;
};


const humidityColorMap: Record<string, string> = {
  0: "bg-humidityWhite",
  10: "bg-humidityLightBlue",
  20: "bg-humidityLightSkyBlue",
  30: "bg-humidityLightBlue2",
  40: "bg-humiditySkyBlue",
  50: "bg-humidityDeepSkyBlue",
  60: "bg-humidityBlue",
  70: "bg-humidityDarkBlue",
  80: "bg-humidityDarkBlue2",
  90: "bg-humidityDarkBlue3",
  100: "bg-humidityNavy",
};

export const renderHumidityColor = (humidity: number) => {
  let color: string;
  if (humidity <= 10) {
    color = humidityColorMap[0];
  } else if (humidity <= 20) {
    color = humidityColorMap[10];
  } else if (humidity <= 30) {
    color = humidityColorMap[20];
  } else if (humidity <= 40) {
    color = humidityColorMap[30];
  } else if (humidity <= 50) {
    color = humidityColorMap[40];
  } else if (humidity <= 60) {
    color = humidityColorMap[50];
  } else if (humidity <= 70) {
    color = humidityColorMap[60];
  } else if (humidity <= 80) {
    color = humidityColorMap[70];
  } else if (humidity <= 90) {
    color = humidityColorMap[80];
  } else {
    color = humidityColorMap[100];
  }
  return color;
};

const aqiColorMap: Record<string, string> = {
  good: "bg-aqiGood",
  moderate: "bg-aqiModerate",
  unhealthySensitive: "bg-aqiSen",
  unhealthy: "bg-aqiUnheal",
  veryUnhealthy: "bg-aqiVeryUnheal",
  hazardous: "bg-aqiHazard",
};

export const renderAQIColor = (aqi: number) => {
  let color: string ;
  if (aqi <= 50) {
    color = aqiColorMap["good"];
  } else if (aqi <= 100) {
    color = aqiColorMap["moderate"];
  } else if (aqi <= 150) {
    color = aqiColorMap["unhealthySensitive"];
  } else if (aqi <= 200) {
    color = aqiColorMap["unhealthy"];
  } else if (aqi <= 300) {
    color = aqiColorMap["veryUnhealthy"];
  } else {
    color = aqiColorMap["hazardous"];
  }
  return color;
};

export const columns = [
  {name: "NAME", uid: "name", sortable: true},
  {name: "BATTERY", uid: "battery", sortable: true},
  {name: "LAST UPDATE", uid: "lastupdate", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "TOKEN", uid: "jwt"},
  {name: "ACTIONS", uid: "actions"},
];
export const statusOptions = [
  {name: "active", uid: "active"},
  {name: "inactive", uid: "inactive"},
];


export const renderCell = (device: DeviceTableForm, columnKey: React.Key) => {
  const cellValue = device[columnKey as keyof DeviceTableForm];
  const deviceID = device._id;
  switch (columnKey) { //case: name status battery jwt lastupdate actions
    case "name":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        </div>
      );
    case "battery":
      return (
        <div className="flex flex-wrap">
          <div className="w-24">
            <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
              <div className="border-r-4 h-3 rounded-r absolute flex border-gray-400 ml-12 mt-1 z-10"></div>
              <div
                className={`cursor-default bg-${renderBattery(Number(cellValue))} text-xs font-bold leading-none flex items-center justify-center m-0.5 py-2 text-center text-white`}
                style={{ width: `${cellValue}%`, height: "3px" }}
              >
                <div className="absolute left-0 right-0 mx-auto text-gray-700">{cellValue}%</div>
              </div>
            </div>
          </div>
        </div>
      );
    case "jwt":
      return (
          <div className="relative w-32 rounded-3xl flex items-center gap-2 hover:bg-gray-200 bg-gray-100 bg-cover " onClick={() => navigator.clipboard.writeText(cellValue.toString())} >
            <Tooltip content="COPY"  >
              <span className="text-base text-default-400 cursor-pointer active:opacity-50 flex items-center ml-3 md-3 ">
                {cellValue} <DocumentDuplicateIcon className="w-5 h-5 ml-3" />
              </span>
            </Tooltip>
          </div> 
      );
    case "lastupdate":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">
            {new Date(cellValue).toLocaleString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
      );
    case "status":
      return (
        <Chip className="capitalize" color={statusColorMap[device.status]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/dashboard/devices/${deviceID}`}>
              <Tooltip content="view detail">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon className="w-6 h-6" />
                </span>
              </Tooltip>
            </Link>
            <Tooltip content="Edit device">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <PencilSquareIcon className="w-6 h-6" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete device">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <TrashIcon className="w-6 h-6" />
              </span>
            </Tooltip>
          </div>
        );
    default:
      return cellValue;
  }
}


export const renderSensorData = (sensor: any) => {
  const name = sensor.name;
  const value = sensor.value;
  const unit = sensor.unit;
  switch(name){
    case "Temperature":
      return (
        <div className="w-10/12 columns-3 space-x-4  ">
          <div className="flex mr-40 space-x-2">
            <TemperetureIcon width="50" height="50" /> {name}
          </div>
          <div className={`${renderTemperatureColor(value)} bg-cover inline-block p-2 items-center justify-center rounded`}>
        {value}
          </div>
          <div>{unit}</div>
        </div>
      );
    case "Humidity":
      return (
        <div className="w-10/12 columns-3 space-x-4 mt-2">
          <div className="flex mr-40 space-x-2">
            <HumidityIcon width="50" height="50" /> {name}
          </div>
          <div className={`${renderHumidityColor(value)} bg-cover inline-block p-2 items-center justify-center rounded ml-10`}>
        {value}
          </div>
          <div>{unit}</div>
        </div>
      );
    case "AQI":
      return (
        <div className="w-10/12 columns-3 space-x-4 mt-2  ">
          <div className="flex mr-40 space-x-2">
            <DustIcon width="50" height="50" /> {name}
          </div>
          <div className={`${renderAQIColor(value)} bg-cover inline-block p-2 items-center justify-center rounded mr-40  `}>
        {value}
          </div>
          <div>{unit}</div>
        </div>
      );
    default:
      return null;
  }
}

export const renderConectedGroup = (groupID: any) => {
  if(groupID){
    return (
      <div className="mt-3">
            <Link href={`/dashboard/groups/${groupID}`}>
              <div className="bg-cyan-500 hover:bg-cyan-600  bg-cover text-white  inline-block p-2 items-center justify-center rounded mr-40">Connected Group</div>
            </Link>
      </div>
    );
  }else{
    return null;
  }
}