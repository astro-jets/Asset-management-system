"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';

// Components
import ErrorModal from "../../components/ErrorModal";
import SuccessModal from "../../components/SuccessModal";
import { signUp } from "../../actions/auth";
import Loader from "@/components/loader/page";
import Image from "next/image";
import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";

const Signup = () => {
    const [errModalStatus, seterrModalStatus] = useState(false);
    const [succModalStatus, setSuccModalStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        const res = await signUp({ email: email, password: password, name: name });
        console
        if (res) {
            setModalMsg(res.message)
            if (res.status) {
                setSuccModalStatus(true)
                setLoading(false);
            } else {
                seterrModalStatus(true)
                setLoading(false);
            }
        }

    }

    return (
        <>
            <ErrorModal
                message={modalMsg}
                title="Could'nt sign you up!"
                isOpen={errModalStatus}
                url="/"
                onClose={() => seterrModalStatus(false)}
            />
            <SuccessModal
                message={modalMsg}
                title="User signed up."
                isOpen={succModalStatus}
                url="/signin"
                onClose={() => {
                    setSuccModalStatus(false)
                    router.push("/signin")
                }}
            />
            {loading ? <Loader /> : null}

            <div className="font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <Image
                        width={561}
                        height={113}
                        src={"/images/logo.png"}
                        alt=""
                        className="mb-4 object-cover overflow-hiddden"
                    />
                    <div className="flex justify-center py-6 items-center gap-4 max-w-6xl w-full">
                        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                            <form action={handleSubmit} className="space-y-4">
                                <div className="mb-8">
                                    <h3 className="text-gray-800 text-3xl font-extrabold">Sign Up</h3>
                                    <p className="text-gray-500 text-sm mt-4 leading-relaxed">Fill in this form with your details to create your account.</p>
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Username</label>
                                    <div className="relative flex items-center">
                                        <input name="username" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-orange-600" placeholder="Enter user name"
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                    <div className="relative flex items-center">
                                        <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-orange-600" placeholder="Enter user name"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                        <BsEnvelope size={20} color="gray" className="w-[18px] h-[18px] absolute right-4" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-orange-600" placeholder="Enter password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="!mt-8">
                                    <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none">
                                        Sign Up
                                    </button>
                                </div>

                                <p className="text-sm !mt-8 text-center text-gray-800">Already have an account? <Link href="/sinin" className="text-orange-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sing in here</Link></p>
                            </form>
                        </div>
                        {/* <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
                            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;