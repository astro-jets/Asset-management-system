"use client"

import { deleteClaim } from "@/app/actions/claims";
import { useState } from "react";
import SucessModal from "../SuccessModal";
import { useRouter } from "next/navigation";

type claimProps = {
    _id: string;
    title: string;
    description: string;
    status: string;
    service: {
        name: string; description: string;
    },
    user: {
        name: string; email: string;
    }
}

const SingleClaim = ({ claim }: { claim: claimProps }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async (status: string) => {
        const res = await deleteClaim(claim._id, status)
        if (res) {
            setModalMsg(res.message)
            setShowModal(true)
        }
    }

    const handleClose = () => {
        setShowModal(false)
        router.push('/claims')
    }

    return (
        <div className="shadow-ld shadow-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800">Claim Details</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
                <div className="flex w-1/3">
                    <p className="text-gray-800 font-bold w-full">
                        <span className="text-gray-800 ">Title:</span> {claim.title}
                    </p>
                </div>
                <div className="flex  w-1/3">
                    <p className=" text-gray-800 w-full">
                        <span className="font-bold">From:</span> {claim.user.email}
                    </p>
                </div>
                <div className="flex  w-1/3">
                    <p className="text-gray-800 break-words w-full">
                        <span className="font-bold">User:</span> {claim.user.name}
                    </p>
                </div>
                <div className="flex w-1/3 ">
                    <p className="text-gray-800 w-full">
                        <span className="font-bold">Service:</span> {claim.service.name}
                    </p>
                </div>
                <div className="flex flex-col space-y-3">
                    <p className="text-gray-800 font-bold">Claim Description:</p>
                    <p className="text-gray-800 break-words w-3/4">
                        {claim.description}
                    </p>
                </div>
            </div>
            <div className="px-6 py-4 flex justify-start space-x-2">
                <button className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none"
                    onClick={() => { handleSubmit(claim._id) }}
                >
                    Delete Claim
                </button>
            </div>
            <SucessModal
                message={modalMsg}
                title={"Update Success!"}
                isOpen={showModal}
                onClose={() => { handleClose() }}
                url={''}
            />
        </div>
    );
}

export default SingleClaim;