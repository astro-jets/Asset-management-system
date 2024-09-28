import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import EmptyModal from "@/app/components/EmptyModal";
import Link from "next/link";
import Image from "next/image";
import { getMaintenances } from "@/app/actions/maintenance";
import { MaintenaceProps } from "@/types/maintenace";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getNotifications } from "@/app/actions/action";

export const metadata: Metadata = {
    title: "World Vision | Maintenances",
    description: "This is the maintenaces page",
};

const MaintenancesPage = async () => {
    const session = await getServerSession(options);
    const user = session?.user;
    if (!user) { return }
    const res = await getMaintenances();
    const maintenances: MaintenaceProps[] = res.maintenances;
    const notification = await getNotifications("admin");
    const notifications = notification.notifications;

    return (
        <DefaultLayout notifications={notifications}>
            <Breadcrumb pageName="Maintenances" />
            {
                maintenances ?
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {
                            maintenances.map(maintenance => (
                                <div className="flex flex-col bg-white  shadow-gray-300 shadow-lg rounded-xl">
                                    <div className="p-1 flex flex-col items-center justify-center">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={`/uploads/${maintenance.asset?.path!}`}
                                            alt=""
                                            className="rounded-2xl object-cover w-full h-full"
                                        />
                                        <div className="flex-col flex p-3">
                                            <h3 className="text-lg font-bold text-gray-800">{maintenance.asset?.name!}</h3>
                                            <p className="text-graydark dark:text-gray">{maintenance.message}</p>
                                            <Link href={`/admin/maintenances/${maintenance._id}`} className="border-primary border-[1px] rounded-lg mt-5 p-2 w-1/4 flex items-center space-x-2">
                                                view
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    : <EmptyModal
                        title="No maintenances found."
                        message="Please try requesting an asset maintenace."
                        buttonMessage="Get Started"
                        link="/assets/"
                    />
            }
        </DefaultLayout>
    );
};

export default MaintenancesPage;
