"use client"

import { signUp } from "@/app/actions/auth";
import Link from "next/link";
import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
type instructor = {
    name: string; email: string; password: string; role: string
}
const initialInstructor: instructor = {
    name: '', email: '', password: '', role: 'instructor'
}
const NewInstructor = () => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);
    const [formData, setFormData] = useState(initialInstructor);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true)
        const res = await signUp(formData);
        if (res.status) {
            setFormData(initialInstructor);
            setLoading(false)
            setShowModal(true);
        } else {
            setErrMsg(res.message)
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
                message="Succefully created the instructor."
                title="Instructor created"
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
                title="Failed to create the instructor"
                isOpen={showErrModal}
                onClose={() => {
                    setShowErrModal(false);
                    router.refresh();
                }}
                url=""
            />
            {!showForm &&
                <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
                    <button type="button" className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-primary hover:text-white lg:px-8 xl:px-10"
                        onClick={() => { setShowForm(true) }}
                    >
                        Add new
                    </button>
                </div>
            }
            {showForm &&
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Registration Form
                        </h3>
                    </div>
                    <form >
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }}
                                    value={formData.name}
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })
                                    }}
                                    value={formData.email}
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })
                                    }}
                                    value={formData.password}
                                />
                            </div>

                            <div className="mb-5.5 mt-5 flex items-center justify-between">
                                <label htmlFor="formCheckbox" className="flex cursor-pointer">
                                    <div className="relative pt-0.5">
                                        <input
                                            type="checkbox"
                                            id="formCheckbox"
                                            className="taskCheckbox sr-only"
                                        />
                                        <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                                            <span className="text-white opacity-0">
                                                <svg
                                                    className="fill-current"
                                                    width="10"
                                                    height="7"
                                                    viewBox="0 0 10 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <p>Remember me</p>
                                </label>

                                <Link
                                    href="#"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forget password?
                                </Link>
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

export default NewInstructor;