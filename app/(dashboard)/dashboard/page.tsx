import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getCustomerStats, getReports } from "@/app/actions/action";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { StatsType } from "@/types/stats";
import { MonthlyReport } from "@/types/monthlyReport";
export const metadata: Metadata = {
    title: "World Vision | Dashboard",
    description: "This is the dashboard",
};

export default async function Home() {
    const session = await getServerSession(options);
    if (!session?.user) { return }
    // Get users stats
    const res = await getCustomerStats(session.user.id);
    console.log("RES => ", res)

    const stats: StatsType = res.stats;

    const reports = await getReports();
    const monthly: MonthlyReport = reports.monthly;

    const data = {
        monthly,
        stats
    }

    return (
        <>
            <CustomerDashboard>
                <ECommerce data={data} />
            </CustomerDashboard>
        </>
    );
}
