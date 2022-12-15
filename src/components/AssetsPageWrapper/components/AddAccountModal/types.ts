import { TAssetsData } from "store/assets/types";

export type AddAccountModalProps = {
  showPopUp: boolean;
  setShowPopUp: (val: boolean) => void;
  setSelectedAsset: (val: TAssetsData | null) => void,
}