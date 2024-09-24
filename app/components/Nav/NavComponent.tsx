"use client"
import { readNotifications } from "@/app/actions/action";
import { notificationProps } from "@/types/notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SucessModal from "../NotificationModal";
import Image from "next/image";

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
            <div className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
                <div className="container">
                    <div className="relative -mx-4 flex items-center justify-between">
                        <div className="w-50 max-w-full px-4">
                            <a href="/#" className="block w-full py-5">
                                <Image alt="" width={250} height={200} src={"/images/logo.png"} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavComponent;
