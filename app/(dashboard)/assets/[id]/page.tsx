import { getAsset } from "@/app/actions/assets";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AssetProps } from "@/types/asset";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import moment from "moment";
import AssetMaintenace from "@/components/Maintenace/page";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
type paramProps = {
    params: Params
}

const SingleAsset = async ({ params }: paramProps) => {
    const id = params.id;
    const res = await getAsset(id);
    const asset: AssetProps = res.asset;
    console.log(res)
    if (!asset) { return }
    const date = asset.createdAt as string;
    return (
        <CustomerDashboard notifications={[]}>
            <Breadcrumb pageName={`Assets | ${asset.name}`} />
            <div className="w-full flex justify-center">
                <div className="w-4/5 flex justify-between bg-white p-2 rounded-2xl shadow-3 shadow-boxdark">
                    <img src={`/uploads/${asset.path}`} className="object-cover rounded-2xl w-[400px] h-[400px]" alt="" />
                    <div className="flex items-center text-boxdark-2 space-y-2 flex-col text-2xl">
                        <img src="/images/logo.png" className="w-full h-20 object-contain overflow-hidden" alt="" />
                        <div className="flex flex-col w-3/4 space-y-2">
                            <h1>Asset Name: {asset.name}</h1>
                            <p>Asset Cost: {asset.cost}</p>
                            <p>Registered On: {moment(date).calendar()}</p>
                            <p>Assigned On: {asset.assigned_on}</p>
                            <img src={asset.qrCode} className="object-cover rounded-2xl w-30 h-30" alt="" />
                            <AssetMaintenace asset={asset._id as string} />
                        </div>
                    </div>
                </div>
            </div>
        </CustomerDashboard>
    );
}

export default SingleAsset;