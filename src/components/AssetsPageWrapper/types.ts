import { TAssetsData, TAssetsDetailData } from "store/assets/types";

export interface IAssetsDataProps {
  selectedAsset: TAssetsDetailData;
}

export interface IAssetsSearchProps {
  searchValue: string;
}

export interface IAssetsModal {
  showPopUp: boolean;
  setShowPopUp: (val: boolean) => void;
  setSelectedAsset: (val: TAssetsData | null) => void,
  selectedAsset: TAssetsData
}


