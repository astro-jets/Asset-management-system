import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import EmptyModal from "@/app/components/EmptyModal";
import Link from "next/link";
import Image from "next/image";
import { getMaintenanceByUser } from "@/app/actions/maintenance";
import { MaintenaceProps } from "@/types/maintenace";
import { getNotifications } from "@/app/actions/action";

export const metadata: Metadata = {
    title: "World Vision | Maintenances",
    description: "This is the maintenaces page",
};

const MaintenancesPage = async () => {
    const session = await getServerSession(options);
    const user = session?.user;
    if (!user) { return }

    // Get Notifications
    const notficationsRequest = await getNotifications(user.id);
    const notifications = notficationsRequest.notifications;
    const res = await getMaintenanceByUser(user.id);
    const maintenances: MaintenaceProps[] = res.maintenances;

    return (
        <CustomerDashboard notifications={notifications}>
            <Breadcrumb pageName="Maintenances" />
            {
                maintenances ?
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {maintenances.map(maintenance => (
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
                                        <Link href={`/claims/`} className="border-primary border-[1px] rounded-lg mt-5 p-2 w-1/4 flex items-center space-x-2">
                                            view
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    // <div className="flex flex-col items-center w-full">
                    //     <h1 className="text-2xl">You have not made any maintenace requests yet</h1>
                    //     <p>Go to Assets then click on view, finally click request maintenace.</p>
                    // </div>

                    <EmptyModal
                        title="You have no maintenace requests."
                        message="Request an asset maintenace by viewing an asset then click request maintenace."
                        buttonMessage="Get sStarted"
                        link="/assets"
                    />
            }
        </CustomerDashboard>
    );
};

export default MaintenancesPage;
