// 'use client'
// import { useParams } from 'next/navigation';
import { fetchMyData } from '@/app/lib/data';
import Breadcrumbs from "@/app/ui/breadcrumbs";
import AddDeviceTable from '@/app/ui/groups/add-devices';
import { Suspense } from 'react';

export default async function add({ params }: { params: { id: string } }) {
  const ungroupDevice = await fetchMyData('/devices/ungroup')
  return(
    <div>
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Groups', href: '/dashboard/groups' },
          {label: 'Groups Detail', href: `/dashboard/groups/${params.id}` },
          {
            label: 'Add New Device',
            href: `/dashboard/groups/${params.id}/devices/add`,
            active: true,
          },
        ]}
      />
      <Suspense >
        <AddDeviceTable devices={ungroupDevice} groupID={params.id} />
      </Suspense>
    </div>
  );
}