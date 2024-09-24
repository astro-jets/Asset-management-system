"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { BsPeople, BsCurrencyDollar, BsWindowDesktop } from "react-icons/bs";
import { MonthlyReport } from "@/types/monthlyReport";
import { StatsType } from "@/types/stats";
import { notificationProps } from "@/types/notification";
type dataProps = {
  stats: StatsType;
  monthly: MonthlyReport
  notifications?: notificationProps
}
const ECommerce = ({ data }: { data: dataProps }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">

        <CardDataStats title="Maintenances" total={data.stats?.maintenances!}>
          <BsWindowDesktop color="#ff8e25" size={20} />
        </CardDataStats>

        <CardDataStats title="Assigned Assets" total={data.stats?.assignments}>
          <BsPeople size={20} color={'#ff8e25'} />
        </CardDataStats>

        <CardDataStats title="Asset Revenue" total={data.stats?.revenue.toLocaleString()}>
          <BsCurrencyDollar size={20} color={'#ff8e25'} />
        </CardDataStats>
      </div >

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 space-y-4">
          {data.monthly ? <ChartOne monthly={data.monthly} /> : <p className="w-full text-lg font-bold text-center">No Data available yet</p>}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
