import { DateSchemaConstructor, ArraySchema } from "yup";

import { TAssetsWalletBlockchein } from "../../components/AssetsPageWrapper/components/ConnectAssetsWalletForm/types";

declare module "yup" {
  interface ArraySchema {
    format(format: TAssetsWalletBlockchein[]): ArraySchema;
  }
}

export const array: DateSchemaConstructor;