import moment from "moment";

export const calculateAssetExpiry = (expiryDate: any) => {
  // Add 5 years to the input date to get the expiry date
  const date = moment(expiryDate).add(5, "years");

  // Calculate the time left until the expiry date
  const now = moment();
  const yearsLeft = date.diff(now, "years");
  now.add(yearsLeft, "years"); // Adjust the `now` moment after calculating years
  const monthsLeft = date.diff(now, "months");
  now.add(monthsLeft, "months"); // Adjust the `now` moment after calculating months
  const daysLeft = date.diff(now, "days");

  const assetExpiryData = {
    yearsLeft,
    monthsLeft,
    daysLeft,
  };
  return assetExpiryData;
};
