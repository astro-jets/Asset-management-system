import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getCustomerStats } from "@/app/actions/action";
import CustomerDashboard from "@/components/Layouts/CustomerDashboard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export const metadata: Metadata = {
    title: "World Vision | Dashboard",
    description: "This is the dashboard",
};

export default async function Home() {
    const session = await getServerSession(options);
    if (!session?.user) { return }
    // Get users
    const res = await getCustomerStats(session.user.id);
    const data = res;

    return (
        <>
            <CustomerDashboard>
                <ECommerce data={data} />
            </CustomerDashboard>
        </>
    );
}
