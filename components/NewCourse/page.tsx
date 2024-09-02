"use client"


import Link from "next/link";
import { useState } from "react";
import Loader from "../common/Loader";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/ErrorModal";
import { CourseProps } from "@/types/course";

const initialCourse: CourseProps = {
    name: '', description: '', price: '', path: ''
}
const NewCourse = () => {
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [showErrModal, setShowErrModal] = useState(false);
    const [formData, setFormData] = useState(initialCourse);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!file) { return }
        const data = new FormData();
        data.append('file', file);
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        console.log("Req => ", data)
        setLoading(true)
        const res = await fetch(`http://localhost:3000/api/courses/new`, {
            method: "POST",
            body: data,
        });
        console.log("Res => ", res)
        const result = await res.json();
        if (result.status) {
            setFormData(initialCourse);
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
                            Add new course
                        </h3>
                    </div>
                    <form >
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Couse Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Course Name"
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
                                    Course Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            price: e.target.value
                                        })
                                    }}
                                    value={formData.price}
                                />
                            </div>


                            <div className="w-full flex justify-between mb-4">
                                <div className="w-[66%]">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Course Description
                                    </label>
                                    <textarea id="hs-textarea-with-corner-hint" className="py-3 px-4 block w-full h-60 shadow-lg border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="An explanation of the claim you are issuing."
                                        value={formData.description}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                description: e.target.value
                                            })
                                        }}
                                    ></textarea>
                                </div>

                                <div className="flex flex-col  w-[30%]">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Upload Image
                                    </label>
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400"> PNG or JPG (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => { setFile(e.target.files?.[0]) }} />
                                    </label>
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

export default NewCourse;