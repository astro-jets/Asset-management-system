"use client"
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import DonutChart from "@/components/Charts/Doniughts";

const Charts = ({ expiry, monthly, weekly }: { expiry: any, weekly: any, monthly: any }) => {
    return (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 space-y-4">
                <ChartOne monthly={monthly} />
                <ChartTwo weekly={weekly} />
                <DonutChart expiry={expiry} />
            </div>
        </div>
    );
}

export default Charts;