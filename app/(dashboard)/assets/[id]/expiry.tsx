"use client"
import moment from "moment";
const AssetExpiry = ({ expiryDate }: { expiryDate: any }) => {
    const date = moment(expiryDate).add(5, "years").format('YYYY-MM-DD');
    return (
        <p>Expires On: {moment(date as string).calendar()}</p>
    );
}

export default AssetExpiry;