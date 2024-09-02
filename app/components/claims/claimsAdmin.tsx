"use client"

import { getclaims } from "@/app/actions/claims";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPlusCircle, BsTrash, BsXCircle } from "react-icons/bs";

type serviceProps = {
    id: string;
    name: string;
    price: string;
    list: string[];
}[];
const ClaimsAdminList = ({ claims }: { claims: serviceProps }) => {
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Cost</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Covers</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 ">
                                    {
                                        claims?.map(service => (
                                            <tr className="hover:bg-gray-100 ">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{service.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">K {service.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                    {
                                                        service.list.map(item => (
                                                            <li className="list-disc" >{item}</li>
                                                        ))
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium ">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 p-3 hover:scale-125 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                                                    >
                                                        <BsTrash color={'red'} size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ClaimsAdminList;