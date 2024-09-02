"use client"
import { readNotifications } from "@/app/actions/action";
import { notificationProps } from "@/types/notification";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsBell, BsCalendar2Event, BsDoorOpen, BsHouse, BsPersonCircle } from "react-icons/bs";
import { IoFolderOpenOutline, IoSpeedometerOutline } from "react-icons/io5";
import SucessModal from "../NotificationModal";

const initialModal = {
    status: false,
    message: '',
    title: ''
}

const NavComponent = ({ notifications }: { notifications: notificationProps[] }) => {
    const { data: session, status } = useSession()
    const [profileState, setProfileState] = useState(false)
    const [notificationsState, setNotificationsState] = useState(false)
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(initialModal)
    const router = useRouter();

    const handleNotificationClick = async (notification: any) => {
        console.table(notification)
        const res = await readNotifications(notification._id)
        if (res) {
            setModal({
                status: true,
                message: notification.message as string,
                title: notification.title as string
            });
        }
    }

    const closeModal = async () => {
        setModal({
            ...initialModal,
            status: false
        });
        router.push('/')
    }


    return (
        <>
            <SucessModal
                message={modal.message}
                title={modal.title}
                isOpen={modal.status}
                onClose={() => { closeModal() }
                }
            />
            <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
                <div className="container">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-50 max-w-full px-4">
                            <a href="/#" className="block w-full py-5">
                                <h1 className="text-blue-600k">Quick Pass</h1>
                            </a>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <div>
                                <button
                                    onClick={() => setOpen(!open)}
                                    id="navbarToggler"
                                    className={` ${open && "navbarTogglerActive"
                                        } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                                >
                                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                                    <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                                </button>
                                <nav
                                    id="navbarCollapse"
                                    className={`absolute right-0 top-full w-full lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:dark:bg-transparent ${!open && "hidden"
                                        } `}
                                >
                                    <ul className="block lg:flex">
                                        <ListItem NavLink="/">Home</ListItem>
                                        <ListItem NavLink="/courses">Courses</ListItem>
                                        <ListItem NavLink="/about">About</ListItem>
                                        <ListItem NavLink="/contacts">Cotnact Us</ListItem>
                                        <ListItem NavLink="/help">Help</ListItem>
                                    </ul>
                                </nav>
                            </div>


                            {/* Profile */}
                            {status === "authenticated" ?
                                (
                                    <>
                                        <div className="absolute inset-y-0 -right-20 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                                            {/* Profile dropdown */}
                                            <div className="relative ml-3">
                                                <div>
                                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                                        onClick={() => { setProfileState(!profileState) }}
                                                    >
                                                        <span className="absolute -inset-1.5"></span>
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-13 w-13 border-primary border-2 rounded-full" src="/images/user/user-01.png" alt="" />
                                                    </button>
                                                </div>
                                                {
                                                    profileState &&
                                                    <div

                                                        className={`absolute -right-25 rounded-lg mt-4 flex w-62.5 flex-col border border-stroke bg-white shadow-default`}
                                                    >
                                                        <ul className="flex flex-col gap-3.5 border-b border-stroke px-6 pt-7.5 pb-4 dark:border-strokedark">

                                                            <li>
                                                                <Link
                                                                    href="/dashboard"
                                                                    className="flex gap-3.5"
                                                                >
                                                                    <IoSpeedometerOutline size={20} color="gray" />
                                                                    <p className=" text-[#494949] font-medium  hover:text-blue-600">Dashboard</p>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href="/applications"
                                                                    className="flex  gap-3.5"
                                                                >
                                                                    <IoFolderOpenOutline size={20} color="gray" />
                                                                    <p className=" text-[#494949] font-medium duration-300 ease-in-out hover:text-blue-600 lg:text-base">Applications</p>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href="/lessons"
                                                                    className="flex  gap-3.5"
                                                                >
                                                                    <BsCalendar2Event size={20} color="gray" />
                                                                    <p className=" text-[#494949] font-medium duration-300 ease-in-out hover:text-blue-600 lg:text-base">Lessons</p>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <button className="flex items-center gap-3.5 px-6 py-3 text-sm font-medium duration-300 ease-in-out hover:text-blue-600 lg:text-base"
                                                            onClick={() => { signOut() }}
                                                        >
                                                            <svg
                                                                className="fill-current"
                                                                width="22"
                                                                height="22"
                                                                viewBox="0 0 22 22"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                            Log Out
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        {
                                            notifications.length ?
                                                <div className="absolute inset-y-0 -right-20 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                                                    {/* Profile dropdown */}
                                                    <div className="relative ml-3">
                                                        <div>
                                                            <button type="button" className="relative bg-blue-100 border-[1px] border-blue-500 p-3 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                                                onClick={() => { setNotificationsState(!notificationsState) }}
                                                            >
                                                                <span className="absolute -inset-1.5"></span>
                                                                <span className="sr-only">Open notifications menu</span>
                                                                <BsBell color="blue" size={20} />
                                                            </button>
                                                        </div>
                                                        {
                                                            notificationsState &&
                                                            <div
                                                                className={`absolute  mt-2.5 flex h-90 min-w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${notificationsState === true ? "block" : "hidden"
                                                                    }`}
                                                            >
                                                                <div className="px-4.5 py-3">
                                                                    <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                                                                </div>

                                                                <ul className="flex h-auto flex-col overflow-y-auto">
                                                                    {
                                                                        notifications.map(n => (
                                                                            <li key={n._id}
                                                                                onClick={() => {
                                                                                    handleNotificationClick(n)
                                                                                }}
                                                                            >
                                                                                <Link
                                                                                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
                                                                                    href="#"
                                                                                >
                                                                                    <p className="text-sm flex flex-col space-y-3 text-[#464646]">
                                                                                        <span className="text-black font-bold">
                                                                                            {n.title}
                                                                                        </span>{ }
                                                                                        <span>{n.message}</span>
                                                                                    </p>
                                                                                </Link>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                                            <button
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </>
                                )
                                :
                                <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                                    <a
                                        href="/signin"
                                        className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                                    >
                                        Sign In
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavComponent;

const ListItem = ({ children, NavLink }: { NavLink: string; children: any }) => {
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className="flex py-2 text-base font-medium text-dark hover:text-blue-600 lg:ml-10 lg:inline-flex"
                >
                    {children}
                </a>
            </li>
        </>
    );
};
