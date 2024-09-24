import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getCustomerStats, getNotifications, getReports } from "@/app/actions/action";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { StatsType } from "@/types/stats";
import { MonthlyReport } from "@/types/monthlyReport";
import EmptyModal from "@/app/components/EmptyModal";
export const metadata: Metadata = {
    title: "World Vision | Dashboard",
    description: "This is the dashboard",
};

export default async function Home() {
    const session = await getServerSession(options);
    if (!session?.user) { return }

    const user = session.user;

    // Get Notifications
    const notficationsRequest = await getNotifications(user.id);
    const notifications = notficationsRequest.notifications;

    // Get users stats
    const res = await getCustomerStats(user.id);
    const stats: StatsType = res.stats;

    const reports = await getReports();
    const monthly: MonthlyReport = reports?.monthly;

    const data = {
        monthly,
        stats
    }

    return (
        <>
            <CustomerDashboard notifications={notifications}>
                {data.monthly && data.stats ? < ECommerce data={data} /> : <EmptyModal message={"Try creating new assets and assigng them."} title={"No dashboard data found"} buttonMessage={"Create Asset"} link={"/admin/assets"} />}
            </CustomerDashboard>
        </>
    );
}
