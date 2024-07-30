import { fetchDataById,fetchDeviceDataInGroup } from "@/app/lib/data";
import { Suspense } from 'react';
import GroupDetail from "@/app/ui/groups/detail";
import DeviceTableDetail from "@/app/ui/groups/devicetable";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Link from "next/link";
import { lusitana } from '@/app/ui/fonts';
import { MapIcon } from "@heroicons/react/24/solid";

export default async function Page({ params }: { params: { id: string } }) {
  const groupID = params.id;
  const group = await fetchDataById('/groups/',params.id)
  const devices = await fetchDeviceDataInGroup(params.id)
  // return <p>device id {device}</p>;
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Groups', href: '/dashboard/groups' },
          {
            label: 'Group Details',
            href: `/dashboard/groups/${params.id}`,
            active: true,
          },
        ]}
      />
      <Suspense >
        <GroupDetail group={group} />
      </Suspense>
      <div className="mb-4" >
        {renderMapNavigation(groupID,devices)}
      </div>
      <div className="flex w-full items-center justify-between mt-5 mb-3">
                <h1 className={`${lusitana.className} text-2xl`}>Devices</h1>
      </div>  
      <Suspense>
        <DeviceTableDetail devices={devices} groupID={params.id} />
      </Suspense >
    </div>
  );
}

export async function renderMapNavigation(id: any, device: any): Promise<JSX.Element | null> {
  if (device[0]) {
    return (
      <div className="mt-3">
      <Link href={`/dashboard/groups/${id}/maps`}>
        <div className="bg-lime-500 hover:bg-lime-600  bg-cover text-white inline-flex items-center justify-center rounded mr-40 p-2">
        <MapIcon className="w-5 h-5"  /> Discover on Map
        </div>
      </Link>
      </div>
    );
  } else {
    return null;
  }
}
