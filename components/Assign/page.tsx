"use client"


import Link from "next/link";
import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
import { BsEnvelope, BsPerson, BsPersonAdd, BsSearch, BsX } from "react-icons/bs";
import { FaMapMarker, FaMapMarkerAlt } from "react-icons/fa";
import { MaintenaceProps } from "@/types/maintenace";
import { userProps } from "@/types/user";

const initialAsset: MaintenaceProps = {
    userID: '', assetID: '', message: ''
}
const emptyUsers: userProps[] = []
const AssetAssignment = ({ asset }: { asset: string }) => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);
    const [formData, setFormData] = useState(initialAsset);
    const [users, setUsers] = useState(emptyUsers);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!formData.message) {
            setShowErrModal(true)
            setErrMsg("Please enter the user's name.")
            return
        }
        const username = formData.message as string;
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/users/byName?user=${username}`);
        const result = await res.json();
        console.log("Res => ", result)
        if (result.usersData) {
            setFormData(initialAsset);
            setUsers(result.usersData);
            setLoading(false)
            // setShowModal(true);
        } else {
            setErrMsg(result.message)
            setShowErrModal(true);
            setLoading(false)
        }
    }

    const handleAssignment = async (user: string) => {
        const data = new FormData();
        data.append('user', user);
        data.append('asset', asset);

        console.log("Req => ", data)
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/assignments/new`, {
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
                message="Succefully assigned the asset."
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
                title="Failed to assign the asset."
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
                    Assign Asset
                </p>
            }
            {showForm &&
                <div className="top-30 left-10 w-11/12 absolute rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
                        <h3 className="font-medium text-black dark:text-white">
                            Search for a user
                        </h3>
                        <div className="bg-primary w-9 h-9 p-3 rounded-full flex items-center justify-center cursor-pointer" onClick={() => { setShowForm(false) }}>
                            <BsX size={30} color="white" />
                        </div>
                    </div>
                    <form >
                        <div className="p-6.5">
                            <div className="flex flex-col w-full">
                                <div className="flex items-center mb-4.5 space-x-2">
                                    <input
                                        placeholder="enter a username ..."
                                        className="w-full rounded-2xl border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                message: e.target.value
                                            })
                                        }}
                                        value={formData.message}
                                    />
                                    <div className="w-10 h-10 flex items-center justify-center p-1 shadow-4 shadow-primary cursor-pointer rounded-full bg-primary"
                                        onClick={() => { handleSubmit() }}
                                    >
                                        <BsSearch color="white" size={20} />
                                    </div>
                                </div>

                                {
                                    users ?
                                        users.map(user => (
                                            <div className="flex items-center justify-between space-x-4 w-3/5 p-2 shadow-3 rounded-2xl shadow-primary">
                                                <div className="flex flex-col space-y-3 items-start justify-center">
                                                    <p className="flex space-x-2 items-center">
                                                        <BsPerson size={20} color="orangered" />
                                                        <span>{user.name}</span>
                                                    </p>
                                                    <p className="flex items-center space-x-2">
                                                        <BsEnvelope size={20} color="orangered" />
                                                        <span>{user.email}</span>
                                                    </p>
                                                    <p className="flex items-center space-x-2">
                                                        <FaMapMarkerAlt size={20} color="orangered" />
                                                        <span>Lilongwe</span>
                                                    </p>

                                                </div>
                                                <div className="h-12 w-12 flex items-center justify-center rounded-full p-2 from-primary to-[red] bg-primary shadow-4 shadow-[#ff7979] cursor-pointer"
                                                    onClick={() => { handleAssignment(user.id) }}
                                                >
                                                    <BsPersonAdd color="white" size={30} />
                                                </div>
                                            </div>
                                        ))
                                        : null
                                }

                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export default AssetAssignment;