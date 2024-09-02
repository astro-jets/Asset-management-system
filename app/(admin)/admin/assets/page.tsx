import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AssetProps } from "@/types/asset";
import NewAsset from "@/components/NewAsset/page";
import { getAssets } from "@/app/actions/assets";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Assets",
    description: "This is the assets page",
};

const CoursesPage = async () => {
    const res = await getAssets();
    console.log(res)
    const assets: AssetProps[] = res.Assets;
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Assets" />
            <div className="py-8">
                <NewAsset />
            </div>

            <div className=" flex-wrap gap-10 grid grid-cols-3">
                {
                    assets.map(asset => (
                        <div className="w-full">
                            <div className="mb-9 rounded-[20px] bg-white shadow-2 hover:shadow-lg">
                                <div className="mb-8 overflow-hidden flex h-60 w-full items-center justify-center rounded-xl">
                                    <img className="object-cover w-full h-60" src={`/uploads/${asset.path}`} alt="" />
                                </div>
                                <div className="flex flex-col px-4 py-2">
                                    <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
                                        {asset.name}
                                    </h4>
                                    <p>Cost: MK  <span className="text-primary text-lg"> {asset.cost} </span></p>
                                    <Link href={`/admin/assets/${asset._id}`} className="cursor-pointer bg-primary rounded-2xl text-white p-2 text-center my-2">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </DefaultLayout>
    );
};

export default CoursesPage;
