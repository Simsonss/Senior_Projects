import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import DeviceTable from '@/app/ui/devices/table';
import { fetchMyData } from '@/app/lib/data';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import { PlusIcon,Cog6ToothIcon } from '@heroicons/react/24/outline';
import IncidentDetail from '@/app/ui/dashboard/detail';

export default async function dashboardPage() {
  const data = await fetchMyData('/devices/configuration');
  // console.log(devices);
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Incident</h1>
        {/* <Link href={`/dashboard/configes`} >
                <Button color="primary" startContent={<Cog6ToothIcon className="w-5 h-5" />}>
                  Configes
                </Button>
        </Link> */}
      </div>
      <Suspense>
      <IncidentDetail 
          devicesTemperature={data.devicesTemperature} 
          devicesHumidity={data.devicesHumidity} 
          devicesAqi={data.devicesAqi} 
      />
      </Suspense>
    </div>  
  );
}

//add deley to loading
