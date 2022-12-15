import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";
import { TChildren } from "config/types";

import { getMyAssetsDataSelector, connectAssetsDataSelector } from "store/assets/selectors";
import { getMyAssetsRequest } from "store/assets/reducers";

import AssetsSidebar from "./components/AssetsSidebar";

const AssetsPageWrapper: React.FC<{ children: TChildren }> = ({ children }) => {
  const data = useSelector(getMyAssetsDataSelector);
  const connect = useSelector(connectAssetsDataSelector);
  const location = useLocation();
  const { t } = useTranslation();

  const hasId = () => {
    const last = location.pathname.split("/").slice(-1)[0];
    if (last === "assets") return false;
    return !!last;
  };

  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAssetsRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  return (
    <div className="container">
      {!isMobile && (
        <div className="assets-title_wrapper">
          <h1 className="assets-title">
            {t('naming.exchangesAndWallets')}
          </h1>
          <p className="assets-count">{data?.length}</p>
        </div>
      )}
      <section className="assets">
        {isMobile && !hasId() && <AssetsSidebar />}
        {isMobile && hasId() && <section className="assets-content">{children}</section>}
        {!isMobile && <AssetsSidebar />}
        {!isMobile && <section className="assets-content">{children}</section>}
      </section>
    </div>
  );
};

export default AssetsPageWrapper;
