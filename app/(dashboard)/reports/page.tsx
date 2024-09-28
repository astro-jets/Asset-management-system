import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getCustomerStats } from "@/app/actions/action";
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
    const res = await getCustomerStats(session.user.id);
    const data = res.stats;

    return (
        <>
            <CustomerDashboard notifications={[]}>
                <Breadcrumb pageName="Reports" />
                <Charts />
            </CustomerDashboard>
        </>
    );
}
