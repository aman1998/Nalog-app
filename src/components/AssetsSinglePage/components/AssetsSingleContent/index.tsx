import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MediaQuery from "react-responsive";

import { minLaptopMediaWidth } from "config/constants";

import { getSingleAssetDataSelector } from "store/assets/selectors";

import AssetsNote from "../AssetsNote";
import AssetsSingleBalance from "../AssetsSingleBalance";
import CryptoAssetsSubaccounts from "../CryptoAssetsSubaccounts";

const AssetsSingleContent = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getSingleAssetDataSelector(id));

  return (
    <div className="assets-single__content_wrapper">
      {data?.stock_note && (
        <MediaQuery maxWidth={minLaptopMediaWidth}>
          <AssetsNote text={data?.stock_note} />
        </MediaQuery>
      )}
      <CryptoAssetsSubaccounts />
      <AssetsSingleBalance />
    </div>
  );
};

export default AssetsSingleContent;
