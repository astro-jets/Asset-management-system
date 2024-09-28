import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { AssetProps } from "@/types/asset";
import NewAsset from "@/components/NewAsset/page";
import { getAssetByUser } from "@/app/actions/assets";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
    title: "Assets",
    description: "This is the assets page",
};

const AssetsPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user) { return };

    const res = await getAssetByUser(session.user.id);
    console.log("RES => ", res)
    const assets: AssetProps[] = res.assets;
    return (
        <CustomerDashboard notifications={[]}>
            <Breadcrumb pageName="Assets" />
            <div className=" flex-wrap gap-10 grid grid-cols-3">
                {
                    assets?.map(asset => (
                        <div className="w-full">
                            <div className="mb-9 rounded-[20px] bg-white dark:bg-boxdark shadow-2 hover:shadow-lg">
                                <div className="mb-8 overflow-hidden flex h-60 w-full items-center justify-center rounded-xl">
                                    <img className="object-cover w-full h-60" src={`/uploads/${asset.path}`} alt="" />
                                </div>
                                <div className="flex flex-col px-4 py-2">
                                    <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
                                        {asset.name}
                                    </h4>
                                    <p>Cost: MK  <span className="text-primary text-lg"> {asset.cost} </span></p>
                                    <Link href={`/assets/${asset._id}`} className="cursor-pointer bg-primary rounded-2xl text-white p-2 text-center my-2">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </CustomerDashboard>
    );
};

export default AssetsPage;
