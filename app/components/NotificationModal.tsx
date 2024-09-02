"use client"

import { BsExclamationCircle } from "react-icons/bs";

type modalProps = { message: string, title: string, isOpen: boolean, onClose: () => void };

const SucessModal = ({ message, title, isOpen, onClose }: modalProps) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <BsExclamationCircle color={'blue'} size={50} />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-[#000]" id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-[#585858]">{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={onClose} type="button" className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-blue-700 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-800 sm:mt-0 sm:w-auto">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SucessModal;