import { EAssetsTypes } from "config/types";

import { TAssetsData } from "store/assets/types";

export type AddAccountModalListProps = {
  type: EAssetsTypes|null;
  searchValue: string|undefined;
  setSelectedAsset: (val: TAssetsData | null) => void;
}
