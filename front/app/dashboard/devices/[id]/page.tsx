import { fetchDataById } from "@/app/lib/data";
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import DeviceDetail from "@/app/ui/devices/detail";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page({ params }: { params: { id: string } }) {
  const device = await fetchDataById('/devices/',params.id)
  // return <p>device id {device}</p>;
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Devices', href: '/dashboard/devices' },
          {
            label: 'Device Detail',
            href: `/dashboard/devices/${params.id}`,
            active: true,
          },
        ]}
      />
      <Suspense >
        <DeviceDetail device={device} />
      </Suspense>
    </div>
  );


} 

