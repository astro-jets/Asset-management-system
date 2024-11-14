"use client";
import { calculateAssetExpiry } from "@/components/clculateExpiry";
import moment from "moment";

const AssetExpiry = ({ expiryDate }: { expiryDate: any }) => {
    const expiryData = calculateAssetExpiry(expiryDate);
    return (
        <div className="flex flex-col">
            <p>Expires In</p>
            <p>
                {expiryData.yearsLeft > 0 && `${expiryData.yearsLeft} year${expiryData.yearsLeft > 1 ? 's' : ''}, `}
                {expiryData.monthsLeft > 0 && `${expiryData.monthsLeft} month${expiryData.monthsLeft > 1 ? 's' : ''}, `}
                {expiryData.daysLeft > 0 && `${expiryData.daysLeft} day${expiryData.daysLeft > 1 ? 's' : ''}`}
                {(expiryData.yearsLeft <= 0 && expiryData.monthsLeft <= 0 && expiryData.daysLeft <= 0) && "Expired"}
            </p>
        </div>
    );
};

export default AssetExpiry;
