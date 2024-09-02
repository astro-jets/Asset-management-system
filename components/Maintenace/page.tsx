"use client"


import Link from "next/link";
import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
import { BsPlus, BsX } from "react-icons/bs";
import { MaintenaceProps } from "@/types/maintenace";
import { useSession } from "next-auth/react";

const initialAsset: MaintenaceProps = {
    userID: '', assetID: '', message: ''
}
const AssetMaintenace = ({ asset }: { asset: string }) => {
    const { data: session, status } = useSession();
    const user = session?.user;
    if (!user) { return; }

    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);
    const [formData, setFormData] = useState(initialAsset);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!formData.message) {
            setShowErrModal(true)
            setErrMsg("Please enter the message.")
            return
        }
        const data = new FormData();
        data.append('user', user.id);
        data.append('asset', asset);
        data.append('message', formData.message);
        console.log("Req => ", data)
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/maintenances/new`, {
            method: "POST",
            body: data,
        });
        console.log("Res => ", res)
        const result = await res.json();
        if (result.status) {
            setFormData(initialAsset);
            setLoading(false)
            setShowModal(true);
        } else {
            setErrMsg(result.message)
            setShowErrModal(true);
            setLoading(false)
        }
    }

    return (
        <>
            {
                loading && <Loader />
            }
            <SucessModal
                message="Succefully sent a maintenance request."
                title="Message sent"
                isOpen={showModal}
                onClose={() => {
                    setShowForm(false)
                    setShowModal(false);
                    router.refresh();
                }}
                url=""
            />
            <ErrorModal
                message={errMsg}
                title="Failed to send the request."
                isOpen={showErrModal}
                onClose={() => {
                    setShowErrModal(false);
                    router.refresh();
                }}
                url=""
            />
            {!showForm &&
                <p
                    onClick={() => { setShowForm(!showForm) }}
                    className="w-full  cursor-pointer p-2 text-white bg-primary rounded-2xl text-center">
                    Request Maintenance
                </p>
            }
            {showForm &&
                <div className="top-30 left-10 w-11/12 absolute rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
                        <h3 className="font-medium text-black dark:text-white">
                            Enter maintenace details
                        </h3>
                        <div className="bg-primary w-9 h-9 p-3 rounded-full flex items-center justify-center cursor-pointer" onClick={() => { setShowForm(false) }}>
                            <BsX size={30} color="white" />
                        </div>
                    </div>
                    <form >
                        <div className="p-6.5">
                            <div className="flex flex-col w-full">
                                <div className="mb-4.5">
                                    <textarea
                                        cols={6}
                                        rows={10}
                                        placeholder="write your message here ..."
                                        className="w-full rounded-2xl border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                message: e.target.value
                                            })
                                        }}
                                        value={formData.message}
                                    />
                                </div>
                            </div>

                            <button type="button" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                onClick={handleSubmit}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export default AssetMaintenace;