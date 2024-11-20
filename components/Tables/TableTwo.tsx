"use client"
import Image from "next/image";
import { AssetProps } from "@/types/asset";

import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { FaFilePdf } from "react-icons/fa";
import moment from "moment";
import { calculateAssetExpiry } from "../clculateExpiry";
import { userProps } from "@/types/user";


const TableTwo = ({ assets }: { assets: AssetProps[] }) => {
  if (!assets) { return }

  const downloadPDF = (data: AssetProps[]) => {
    alert("Saving Report")
    const doc = new jsPDF();
    const arr: any = [];
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const ed = calculateAssetExpiry(asset.createdAt);
      const expiry = ed.yearsLeft > 0 ?
        ed.yearsLeft.toString() + " years and " + ed.monthsLeft.toString() + " months" : "Asset has expired";
      arr.push(
        [
          asset._id,
          asset.name,
          moment(asset.createdAt).calendar(),
          expiry,
          asset.cost,
          asset.user ? asset.user.name : "Unassigned"
        ]);
    };

    // Call autoTable with two arguments: doc and options
    autoTable(doc, {
      head: [['Asset ID', 'Name', 'Created On', 'Expires On', 'Procurement Cost', "Assigned to"]],
      body: arr as RowInput[],
    });
    doc.save('assets-data.pdf');
    console.log("Doc => ", doc)
  };


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 w-full flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Assets
        </h4>
        <button
          onClick={() => downloadPDF(assets)}
          className="bg-primary text-white flex py-2 px-4 rounded hover:bg-primary-dark space-x-3"
        >
          <span>Download as PDF</span>
          <FaFilePdf color="white" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Asset Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Expires In</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Created on</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">View Asset</p>
        </div>

      </div>

      {assets.map((asset, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={`/uploads/${asset.path}`}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {asset.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {
                calculateAssetExpiry(asset.createdAt).yearsLeft > 0 ?
                  calculateAssetExpiry(asset.createdAt).yearsLeft.toString() + ' years and ' + calculateAssetExpiry(asset.createdAt).monthsLeft.toString() + " months"
                  : "Expired"
              }
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {moment(asset.createdAt).calendar()}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{asset.cost}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <a href={`assets/${asset._id}`} className="text-sm text-white bg-primary py-2 px-4 rounded-2xl hover:cursor-pointer">view</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
