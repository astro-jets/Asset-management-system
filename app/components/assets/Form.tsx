"use client"

import { useState } from "react";
import { BsPlus } from "react-icons/bs";

const AssetForm = () => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="w-full flex flex-col space-y-4">
            <div
                className="flex space-x-4 w-full p-2 item-center justify-center hover:cursor-pointer"
                onClick={() => { setShowForm(!showForm) }}
            >
                <span className="w-8 h-8 bg-stroke rounded-full p-2 flex items-center justify-center">
                    <BsPlus color="white" size={30} />
                </span>
                <p className="text-xl text-graydark dark:text-gray">
                    {showForm ? 'cancel entry' : 'add a new asset'}
                </p>
            </div>
            {showForm &&
                <div className="border bg-[#f3f3f3] rounded-2xl border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Input Fields
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Asset Name
                            </label>
                            <input
                                type="text"
                                placeholder="Asset Name"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-3/4">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Asset Cost
                                </label>
                                <input
                                    type="number"
                                    placeholder="Asset cost"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Asset depreciation %
                                </label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            File upload
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Attach file
                            </label>
                            <input
                                type="file"
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <span className="w-full flex items-center justify-center">
                        <button className="p-3 w-3/4 bg-primary text-white rounded-2xl">
                            Submit
                        </button>
                    </span>
                </div>
            }
        </div>
    );
}

export default AssetForm;