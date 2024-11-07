"use client";
import moment from "moment";

const AssetExpiry = ({ expiryDate }: { expiryDate: any }) => {
    // Add 5 years to the input date to get the expiry date
    const date = moment(expiryDate).add(5, "years");

    // Calculate the time left until the expiry date
    const now = moment();
    const yearsLeft = date.diff(now, 'years');
    now.add(yearsLeft, 'years'); // Adjust the `now` moment after calculating years
    const monthsLeft = date.diff(now, 'months');
    now.add(monthsLeft, 'months'); // Adjust the `now` moment after calculating months
    const daysLeft = date.diff(now, 'days');

    return (
        <div className="flex flex-col">
            <p>Expires In</p>
            <p>
                {yearsLeft > 0 && `${yearsLeft} year${yearsLeft > 1 ? 's' : ''}, `}
                {monthsLeft > 0 && `${monthsLeft} month${monthsLeft > 1 ? 's' : ''}, `}
                {daysLeft > 0 && `${daysLeft} day${daysLeft > 1 ? 's' : ''}`}
                {(yearsLeft <= 0 && monthsLeft <= 0 && daysLeft <= 0) && "Expired"}
            </p>
        </div>
    );
};

export default AssetExpiry;
