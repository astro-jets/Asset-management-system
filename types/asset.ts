import { userProps } from "./user";

export type AssetProps = {
  _id?: string;
  name: string;
  cost: string;
  depreciation: string;
  createdAt?: string;
  updatedAt?: string;
  qrCode?: string;
  path: string;
  user?: userProps;
  assigned_on?: string;
};
