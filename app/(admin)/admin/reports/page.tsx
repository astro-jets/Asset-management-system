import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getAdminStats, getCustomerStats, getMaintenaceReports, getReports } from "@/app/actions/action";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Charts from "./charts";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export const metadata: Metadata = {
    title: "Reports",
    description: "This is the reports page",
};

export default async function Home() {
    const session = await getServerSession(options);
    if (!session?.user) { return }
    // Get users
    const res = await getReports();
    const res2 = await getMaintenaceReports();
    const weekly = res2.weekly;
    const monthly = res.monthly;

    return (
        <>
            <CustomerDashboard>
                <Breadcrumb pageName="Reports" />
                <Charts monthly={monthly} weekly={weekly} />
            </CustomerDashboard>
        </>
    );
}
