"use client"
import { BsArrow90DegRight, BsExclamationCircle, BsPlusCircle, BsTrash2, BsXCircle } from "react-icons/bs";

import { newclaim } from "@/app/actions/claims";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type claimProps = {
    _id: string;
    title: string;
    description: string;
    service: {
        _id: string,
        name: string,
        price: string,
        list: string[],
    };
}[];
type subscriptionProps = {
    services: {
        _id: string,
        name: string;
        description: string;
        list: string[];
    }[];
};
type formDataTypes = { user: string, subscription: string, title: string, description: string }
const initialData: formDataTypes = { user: '', subscription: '', title: '', description: '' }

const ClaimsComponent = ({ claims, subscriptions }: { claims: claimProps, subscriptions: subscriptionProps }) => {
    const [modalMessage, setModalMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showFrom, setShowForm] = useState(false);
    const [formData, setFormData] = useState<formDataTypes>(initialData)
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleClick = (e: any) => {
        setFormData({
            ...formData,
            subscription: e.target.value
        })
    }

    const handleSubmit = async () => {
        formData.user = session?.user.id!;
        console.log(formData);
        const res = await newclaim(formData);
        if (res) {
            setModalMessage(res.message)
            setSuccess(true)
        }
        setShowForm(!showFrom);
    }
    console.log("Claims => ", claims)
    return (
        <>
            {claims ?
                <>
                    <button className="bg-blue-500 text-white p-2 rounded-lg shadow-lg mb-8 flex space-x-2 items-center "
                        onClick={() => { setShowForm(!showFrom) }}
                    >
                        <p>add a new claim</p>
                        <BsPlusCircle size={20} color={'#fff'} />
                    </button>
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {
                            claims?.map(claim =>

                                <div className="flex flex-col bg-white  shadow-gray-300 shadow-lg rounded-xl">
                                    {/* <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80" alt="Image Description" /> */}
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {claim.title}
                                        </h3>
                                        <p className="mt-1 text-gray-500">
                                            {claim.description}...
                                        </p>
                                        <p className="mt-5 font-bold text-xs text-blue-700">
                                            Claim status: Pending
                                        </p>
                                        <Link href={`/claims/${claim._id}`} className="border-blue-700 border-[1px] rounded-lg mt-5 p-2 w-1/4 flex items-center space-x-2">
                                            <BsArrow90DegRight size={20} color={'orange'} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </>
                :
                <div className="w-full mt-10  flex items-center justify-center">
                    <div className="w-1/2 h-[50vh] rounded-3xl flex flex-col justify-center items-center space-y-20 bg-white shadow-blue-500 shadow-lg">
                        <div className="flex space-x-4 items-center">
                            <h1 className="font-bold text-2xl">You have no claims</h1>
                            <BsExclamationCircle color={'orange'} size={40} />
                        </div>
                        <button className="w-1/2 flex items-center justify-center space-x-4 py-3 px-1 bg-blue-500 rounded-lg text-white shadow-gray-300 shadow-lg"
                            onClick={() => { setShowForm(!showFrom) }}>
                            <p className="text-md text-white font-semibold">New claim</p>
                            <BsPlusCircle color={'#fff'} size={20} />
                        </button>
                    </div>
                </div>
            }

            {showFrom &&
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg space-y-4 py-4">
                                <p className="text-blue-500 text-lg font-bold text-center">Add a new claim</p>
                                <div className="close-btn absolute top-0 right-2 cursor-pointer" onClick={() => { setShowForm(!showFrom) }}>
                                    <BsXCircle size={25} color={'orange'} />
                                </div>
                                <form className="w-full h-80 px-4 space-y-3 flex flex-col items-center">
                                    <input
                                        type="text" name="title" placeholder="Claim Title"
                                        className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                title: e.target.value
                                            })
                                        }}
                                    />
                                    <select className="py-3 px-4 pe-9 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        onChange={(e) => { handleClick(e) }}
                                    >
                                        <option selected>Select claimable subscription</option>
                                        {
                                            subscriptions.services.map((service, index) => (
                                                <option key={index} value={service._id}>
                                                    {service.name}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <div className="w-full flex justify-between items-center mt-4">
                                        <label htmlFor="hs-textarea-with-corner-hint" className="block text-sm font-medium">Message</label>
                                        <span className="block text-sm text-gray-500">100 characters</span>
                                    </div>
                                    <textarea id="hs-textarea-with-corner-hint" className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="An explanation of the claim you are issuing."
                                        value={formData.description}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                description: e.target.value
                                            })
                                        }}
                                    ></textarea>
                                    <button type="button" className="bg-blue-500 rounded-lg p-3 w-3/4 text-white" onClick={(e) => { handleSubmit() }}>Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                success &&
                <SucessModal
                    url=""
                    onClose={() => {
                        setSuccess(false)
                        router.refresh()
                    }}
                    isOpen={success}
                    title="Claim Submitted"
                    message={modalMessage}
                />
            }
        </>
    );
}

export default ClaimsComponent;