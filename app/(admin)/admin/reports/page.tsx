import { Metadata } from "next";
import { getExpiryReports, getMaintenaceReports, getReports } from "@/app/actions/action";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Charts from "./charts";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
    const res3 = await getExpiryReports();

    const expiry = res3.data;
    const weekly = res2.weekly;
    const monthly = res.monthly;

    return (
        <>
            <DefaultLayout notifications={[]}>
                <Breadcrumb pageName="Reports" />
                <Charts expiry={expiry} monthly={monthly} weekly={weekly} />
            </DefaultLayout>
        </>
    );
}
