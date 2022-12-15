import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EAssetsTypes } from "config/types";

import { getMyAssetsDataSelector, getSingleAssetDataSelector } from "store/assets/selectors";

import { getRelativeTime } from "utils/dateHelpers";
import { truncateAmidstDots } from "utils/text";
import { formAssetsName } from "utils/assetsHelper";

import AssetsSingleMenu from "../AssetsSingleMenu";


const AssetsSingleHeader = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getSingleAssetDataSelector(id));
  const assets = useSelector(getMyAssetsDataSelector);
  const asset = assets?.find(item => item.id === data?.id);
  const name = formAssetsName(asset?.name, data?.stock_type);

  return (
    <div className="assets-single__header_wrapper">
      <div className="assets-single__header_data_wrapper">
        <div className="assets-single__header_icon">
          <img src={asset?.icon} alt="assets-icon" />
        </div>
        <div className="assets-single__header_data">
          <div className="assets-single__header_name">{name}</div>
          <div className="assets-single__header_date">
            {t('naming.added')} {getRelativeTime(data?.created_at)}{" "}
            {data?.stock_type === EAssetsTypes.BLOCKCHAIN && (
              <span className="assets-single__header_asset_id">{truncateAmidstDots(asset?.id)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="assets-single__header_vector">
        <AssetsSingleMenu />
      </div>
    </div>
  );
};

export default AssetsSingleHeader;
