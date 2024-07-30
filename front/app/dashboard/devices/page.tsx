import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CreateDevice } from '@/app/ui/devices/buttons';
import DeviceTable from '@/app/ui/devices/table';
import { fetchMyData } from '@/app/lib/data';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';



export default async function Page() {
  const devices = await fetchMyData('/devices');
  // console.log(devices);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Devices</h1>
      </div>
      <Suspense >
        <DeviceTable devices={devices} />
      </Suspense>
    </div>
  );
}

//add deley to loading
