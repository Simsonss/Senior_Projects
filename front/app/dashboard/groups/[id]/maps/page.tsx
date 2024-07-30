import { fetchDataById,fetchDeviceDataInGroup } from "@/app/lib/data";
import { Suspense } from 'react';
import GroupDetail from "@/app/ui/groups/detail";
import DeviceTableDetail from "@/app/ui/groups/devicetable";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Map from "@/app/ui/groups/map";

export default async function MapPage({ params }: { params: { id: string } }) {
  const devices = await fetchDeviceDataInGroup(params.id)
  return(
    <div>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Groups', href: '/dashboard/groups' },
          {label: 'Group Details', href: `/dashboard/groups/${params.id}` },
          {
            label: 'Maps',
            href: `/dashboard/groups/${params.id}/Maps`,
            active: true,
          },
        ]}
      />
      <Map devices={devices}/>
    </div>
  );
}