import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import List from "components/List";
import BNSpinner from "components/BNSpinner";

import { getAssetsDataSelector, getMyAssetsDataSelector, getMyAssetsFetchingSelector } from "store/assets/selectors";
import { TMyAssetsData } from "store/assets/types";
import { getAssetsRequest } from "store/assets/reducers";

import { filterListBySearch } from "utils/filters";

import { IAssetsSearchProps } from "../../types";

import AssetsListItem from "../AssetsListItem";

const AssetsList: FC<IAssetsSearchProps> = ({ searchValue }) => {
  const { t } = useTranslation();
  const loading = useSelector(getMyAssetsFetchingSelector);
  const data = useSelector(getMyAssetsDataSelector);
  const assets = useSelector(getAssetsDataSelector);
  const dispatch = useDispatch();
  const items = filterListBySearch<TMyAssetsData>(data, searchValue, "name");
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  useEffect(() => {
    if (!assets?.length) {
      dispatch(getAssetsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = () => {
    if (!!items?.length) {
      return (
        <>
          {items?.map(item => (
            <AssetsListItem key={item.id} {...item} />
          ))}
        </>
      );
    } else return <h3 className="empty-text">{t("assetsList.emptyText")}</h3>;
  };

  return (
    <div className="assets-list_wrapper">
      <div className="assets-list">
        <List<TMyAssetsData>
          component={getList()}
          loading={loading}
          preloader={<BNSpinner />}
          emptyText={<h3 className="empty-text">{t("assetsList.emptyText2")}</h3>}
          data={data}
        />
      </div>
      {!isMobile && <div className="assets-list_line" />}
    </div>
  );
};

export default AssetsList;
