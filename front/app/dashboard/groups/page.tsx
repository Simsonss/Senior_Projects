
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchMyData } from '@/app/lib/data';
import { group } from 'console';
import GroupTable from '@/app/ui/groups/table';



export default async function Page() {
  const groups = await fetchMyData('/groups');
  // console.log(devices);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Groups</h1>
      </div>
      <Suspense >
        <GroupTable groups ={groups}/>
      </Suspense>
    </div>
  );
}

//add deley to loading
