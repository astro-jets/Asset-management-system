import { AssetProps } from "./asset";
import { userProps } from "./user";

export type MaintenaceProps = {
  _id?: string;
  userID: string;
  assetID: string;
  message: string;
  user?: userProps;
  asset?: AssetProps;
  createdAt?: string;
  updatedAt?: string;
};
