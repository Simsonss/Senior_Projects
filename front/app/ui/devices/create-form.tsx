'use client';
import Link from "next/link";
import { createDevice } from "@/app/lib/actions";
import { Button } from "../button";
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function Form(){
    return (
        <form action={createDevice}>
            <input type="text" name="name" placeholder="Device Name" />
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="location" placeholder="Location" />
            <div className="mt-6 flex justify-end gap-4">
                <Link
                href="/dashboard/devices"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancel
                </Link>
                <Button type="submit">Create Device</Button>
            </div>
        </form>
    )
}