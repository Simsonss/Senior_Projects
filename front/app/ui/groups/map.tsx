'use client'
import React,{useEffect,useState,useRef} from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {renderSensorData} from "@/app/ui/devices/data";
import Image from 'next/image'
import { Modal } from "@nextui-org/react"; 
import { set } from "zod";
import { Asul } from "next/font/google";

export default function Map({devices}:{devices:any[] }){
    const mapRef = useRef<HTMLDivElement>(null);
    const deviceMap = devices.map((device) => {
      if (device.latitude !== null && device.longitude !== null) {
        return {
          name: device.name,
          sensor: device.sensor,
          lat: device.latitude,
          lng: device.longtitude,
        };
      }
    }).filter((device) => device !== undefined);
    
    //find sum of latitude in deviceMap
    const sumLat = deviceMap.reduce((acc, device) => acc + device?.lat, 0);
    const sumLng = deviceMap.reduce((acc, device) => acc + device?.lng, 0);
    const centerPosition = { lat: sumLat / deviceMap.length, lng: sumLng / deviceMap.length };
    console.log(`centerpo:${centerPosition.lat,centerPosition.lng}`);
    useEffect(()=>{
      const initMap = async() =>{
        console.log('init Map')
        const myStyles =[
          {
              featureType: "poi",
              elementType: "labels",
              stylers: [
                    { visibility: "off" }
              ]
          }
        ];

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
            version: "weekly",
          });
        const {Map} = await loader.importLibrary('maps');


        //map options
        const mapOptions:google.maps.MapOptions = {
            center: centerPosition,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: myStyles as google.maps.MapTypeStyle[],
          };
        //set up map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        //add marker
        const exPositions = [
          { lat: 51.5074, lng: 0.1278 },
          { lat: 40.7128, lng: 0.1295 },
        ];
        //add marker

        const markerMap = deviceMap.map(async(device: any) => {
          const marker = new google.maps.Marker({
            position: { lat: device?.lat, lng: device?.lng },
            map: map
          });
          const contentest3  = `
          <div><strong><b>${device.name}</b></strong></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="https://media.istockphoto.com/id/1172202398/vector/frost-heat.jpg?s=612x612&w=0&k=20&c=-Xhce9Efjh23E2jHOVZjgpEbWiy5NleySRiOBDZFbEk=" alt="Logo" style="width: 40px; height: 40px;" />
            <div>${device.sensor[0].name} <b><strong>${device.sensor[0].value}</strong></b> ${device.sensor[0].unit} </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="https://cdn-icons-png.flaticon.com/512/6393/6393411.png" alt="Logo" style="width: 40px; height: 40px;" />
            <div>${device.sensor[1].name} <strong><b>${device.sensor[1].value}</b></strong> ${device.sensor[1].unit} </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="https://static.vecteezy.com/system/resources/previews/035/800/769/original/air-quality-index-aqi-monitoring-line-icon-vector.jpg" alt="Logo" style="width: 40px; height: 40px;" />
            <div>${device.sensor[2].name} <strong><b>${device.sensor[2].value}</b></strong> ${device.sensor[2].unit} </div>
          </div>
          `
          

          const content4 = await displaySensorInfo(device.sensor)
          const infoWindow = new google.maps.InfoWindow({
            content: contentest3,
          });
          // marker.addListener("click", () => {
          //   setModalContent(contentest2);
          //   setModalIsOpen(true);
          // });
          marker.addListener("click", () => {
              infoWindow.open(map, marker);
          });
        }
        );
      }
    
    initMap();
    },[])


  const [modalIsOpen, setModalIsOpen] = useState(false);

  return(
    <div ref={mapRef} style={{height:'80vh',width:'80%'}}>
    </div>
  );
}

async function displaySensorInfo(sensor: any[]): Promise<string> {
  const eachsensor = sensor.map((each: any) => {
    let chuk = '';
    if(each.name === 'Temperature'){
      chuk += `<div style="display: flex; align-items: center; gap: 10px;">
        <img src="https://media.istockphoto.com/id/1172202398/vector/frost-heat.jpg?s=612x612&w=0&k=20&c=-Xhce9Efjh23E2jHOVZjgpEbWiy5NleySRiOBDZFbEk=" alt="Logo" style="width: 40px; height: 40px;" />
        <div>${each.name} ${each.value} ${each.unit} </div>
      </div>`;
    }
    else if (each.name === 'Humidity'){
      chuk += `<div style="display: flex; align-items: center; gap: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/512/6393/6393411.png" alt="Logo" style="width: 40px; height: 40px;" />
        <div>${each.name} ${each.value} ${each.unit} </div>
      </div>`;
    }
    else if (each.name === 'Air Quality'){
      chuk += `<div style="display: flex; align-items: center; gap: 10px;">
        <img src="https://static.vecteezy.com/system/resources/previews/035/800/769/original/air-quality-index-aqi-monitoring-line-icon-vector.jpg" alt="Logo" style="width: 40px; height: 40px;" />
        <div>${each.name} ${each.value} ${each.unit} </div>
      </div>`;
    }
    return chuk;
  });

  const res = eachsensor.join('');
  return res;
}

 
