import { getAsset } from "@/app/actions/assets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AssetProps } from "@/types/asset";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import moment from "moment";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import AssetAssignment from "@/components/Assign/page";
import Image from "next/image";
import { getMaintenance } from "@/app/actions/maintenance";
import { MaintenaceProps } from "@/types/maintenace";
import { userProps } from "@/types/user";
import HandleMaintenance from "@/components/HandleMaintenance/page";
type paramProps = {
    params: Params
}

type maintenaceProp = {
    maintenance: MaintenaceProps;
    user: userProps;
    asset: AssetProps;
}

const SingleMaintenace = async ({ params }: paramProps) => {
    const id = params.id;


    const maintenaces = await getMaintenance(id);
    const maintenance: maintenaceProp = maintenaces.data;
    const asset = maintenance.asset;
    const user = maintenance.user;
    console.log("Maintenances => ", maintenaces)
    return (
        <DefaultLayout notifications={[]}>
            {maintenance ?
                <>
                    <Breadcrumb pageName={`Maintenace Request | ${asset.name}`} />
                    <div className="w-full flex justify-center">
                        <div className="w-full h-full flex justify-between bg-white p-2 rounded-2xl shadow-3 shadow-boxdark">
                            <img src={`/uploads/${asset.path}`} className="object-cover rounded-2xl w-[400px] h-[400px]" alt="" />
                            <div className="flex items-center text-boxdark-2 space-y-2 flex-col text-2xl">
                                <img src="/images/logo.png" className="w-full h-20 object-contain overflow-hidden" alt="" />
                                <div className="flex flex-col w-11/12 space-y-2">
                                    {user &&
                                        <p>Requested By:
                                            <span className="font-bold text-primary cursor-pointer">{user.name}</span>
                                        </p>
                                    }
                                    <p>Requested On: {moment(maintenance.maintenance.createdAt).calendar()}</p>
                                    <p className="text-3xl font-bold">Message</p>
                                    <p className="mt-8 text-md">
                                        {maintenance.maintenance.message}
                                    </p>

                                    <HandleMaintenance maintenance={maintenance.maintenance._id!} />
                                </div>
                            </div>
                        </div>
                    </div>
                </> :
                <div className="px-4 mx-auto max-w-screen-xl justify-center items-center h-full flex flex-col">
                    <Image
                        width={561}
                        height={113}
                        src={"/images/logo.png"}
                        alt=""
                        className="mb-4 object-cover overflow-hiddden"
                    />
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-primary">Unrecognized asset.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that asset. Get back to the dashboard. </p>
                        <a href="/admin/dashboard" className="inline-flex text-primary bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to the dashboard</a>
                    </div>
                </div>
            }
        </DefaultLayout>
    );
}

export default SingleMaintenace;