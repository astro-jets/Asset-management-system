"use client"

import Link from 'next/link';
import { Fragment } from 'react'

const GridStats = ({ link, label, value, icon, positive }:
    { key: number, link: string, label: string, value: string, icon: any, positive: boolean | undefined }) => {
    const valueClass = `text-2xl font-bold ${positive ? 'text-green-500' : 'text-gray-700'}`;

    return (
        <Fragment>
            <Link href={link} className="w-[32%] flex flex-col h-40 items-center space-y-4 p-4 bg-white rounded-lg shadow-blue-400 shadow-lg">
                {icon}
                <span className={valueClass}>{value}</span>
                <span className="text-gray-500 text-sm">{label}</span>
            </Link>
        </Fragment>
    )
}

export default GridStats
