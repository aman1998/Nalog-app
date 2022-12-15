import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";
import { paths } from "config/paths";

import { getSingleAssetRequest } from "store/assets/reducers";
import {
  getSingleAssetDataSelector,
} from "store/assets/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import AssetsSingleHeader from "./components/AssetsSingleHeader";
import AssetsSingleSubHeader from "./components/AssetsSingleSubHeader";
import AssetsSingleContent from "./components/AssetsSingleContent";
import AssetsSingleSkeleton from "./components/AssetsSingleSkeleton";

const AssetsSinglePage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(getSingleAssetDataSelector(id));
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getSingleAssetRequest({ id, onError: () => history.push(paths.ASSETS) }));
    dispatch(analyticEvent(EEventType.WALLETS_ACCOUNT_INFO));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="assets-single-wrapper">
      {!data ? (
        <AssetsSingleSkeleton />
      ) : (
        <div>
          {!isMobile && <AssetsSingleHeader />}
          <AssetsSingleSubHeader />
          <AssetsSingleContent />
        </div>
      )}
    </div>
  );
};

export default AssetsSinglePage;

