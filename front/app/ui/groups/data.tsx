'use client';
import React from "react";
import {Chip, Tooltip, ChipProps} from "@nextui-org/react";
import {
DocumentDuplicateIcon, 
PencilSquareIcon, 
TrashIcon, 
EyeIcon,
} from '@heroicons/react/24/outline';
import { GroupTableForm } from "@/app/lib/definitions";
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  inactive: "danger",
};

export const columns = [
  {name: "NAME", uid: "name", sortable: true},
  {name: "LOCATION", uid: "location", sortable: true},
  {name: "DESCRIPTION", uid: "description"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];
export const statusOptions = [
  {name: "active", uid: "active"},
  {name: "inactive", uid: "inactive"},
];

// export type GroupTableForm = {
//   _id: string;
//   name: string;
//   location: string;
//   description: number;
//   status: string;
// };


export const renderCell = (group: GroupTableForm, columnKey: React.Key) => {
  const cellValue = group[columnKey as keyof GroupTableForm];
  const groupID = group._id;
  switch (columnKey) { //case: name status battery jwt lastupdate actions
    case "name":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        </div>
      );
    case "battery":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
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
        <Chip className="capitalize" color={statusColorMap[group.status]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/dashboard/groups/${groupID}`}>
              <Tooltip content="view detail">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon className="w-6 h-6" />
                </span>
              </Tooltip>
            </Link>
            <Tooltip content="Edit group">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <PencilSquareIcon className="w-6 h-6" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete group">
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

export const renderMapNavigation = (id:any,device:any) => {
  if(device[0]){
    return (
      <div className="mt-3">
            <Link href={`/dashboard/groups/${id}/maps`}>
              <div className="bg-cyan-500 hover:bg-cyan-600  bg-cover text-white  inline-block p-2 items-center justify-center rounded mr-40">Discover on Map</div>
            </Link>
      </div>
    );
  }else{
    return null;
  }
}
