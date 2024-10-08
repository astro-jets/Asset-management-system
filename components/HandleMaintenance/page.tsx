"use client"

import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
import { MaintenaceProps } from "@/types/maintenace";
import { useSession } from "next-auth/react";

const initialAsset: MaintenaceProps = {
    userID: '', assetID: '', message: ''
}
const HandleMaintenance = ({ asset }: { asset: string }) => {
    const { data: session, status } = useSession();
    const user = session?.user;
    if (!user) { return; }

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);
    const [formData, setFormData] = useState(initialAsset);


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
            <div className="flex justify-between space-x-4 w-full">
                <p
                    onClick={() => { setShowForm(!showForm) }}
                    className="w-2/3  cursor-pointer p-2 text-white bg-blue-500 rounded-2xl text-center">
                    Approve
                </p>
                <p
                    onClick={() => { setShowForm(!showForm) }}
                    className="w-2/3  cursor-pointer p-2 text-white bg-primary rounded-2xl text-center">
                    Reject
                </p>
            </div>
        </>
    );
}

export default HandleMaintenance;