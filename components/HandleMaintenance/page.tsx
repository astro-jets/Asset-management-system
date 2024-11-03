"use client"

import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
import { useSession } from "next-auth/react";


const HandleMaintenance = ({ maintenance }: { maintenance: string }) => {
    const { data: session, status } = useSession();
    const user = session?.user;
    if (!user) { return; }

    const router = useRouter();
    const [maintenaceStatus, setStatus] = useState<string>();

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);


    const handleSubmit = async (status: string) => {
        const data = new FormData();
        data.append('id', maintenance);
        data.append('status', status);

        setStatus(status)

        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/maintenances/handle`, {
            method: "PATCH",
            body: data,
        });

        const result = await res.json();


        if (result.maintenances) {
            setLoading(false)
            setShowModal(true);
        } else {
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
                message={`Succefully ${maintenaceStatus} the maintenance request.`}
                title="Message sent"
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    router.push('/admin/maintenances');
                }}
                url=""
            />
            <ErrorModal
                message={errMsg}
                title={`Failed to ${maintenaceStatus} the request.`}
                isOpen={showErrModal}
                onClose={() => {
                    setShowErrModal(false);
                    router.refresh();
                }}
                url=""
            />
            <div className="flex justify-between space-x-4 w-full">
                <p
                    onClick={() => { handleSubmit('approved') }}
                    className="w-2/3  cursor-pointer p-2 text-white bg-blue-500 rounded-2xl text-center">
                    Approve
                </p>
                <p
                    onClick={() => { handleSubmit('rejected') }}
                    className="w-2/3  cursor-pointer p-2 text-white bg-primary rounded-2xl text-center">
                    Reject
                </p>
            </div>
        </>
    );
}

export default HandleMaintenance;