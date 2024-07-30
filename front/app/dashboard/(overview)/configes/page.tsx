import Form from "@/app/ui/dashboard/configes-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { useEffect, useState } from 'react';
import { Suspense } from "react";
 
export default async function Page() { 
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Devices', href: '/dashboard/devices' },
          {
            label: 'Create New Device',
            href: '/dashboard/devices/create',
            active: true,
          },
        ]}
      />
        <Form />
    </div>
  );
}