import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getAssetsSinglePath } from "config/paths";
import { mobileMediaWidth } from "config/constants";

import { getMyAssetsDataSelector, getMyAssetsFetchingSelector } from "store/assets/selectors";

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const myAssets = useSelector(getMyAssetsDataSelector);
  const loading = useSelector(getMyAssetsFetchingSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const history = useHistory();

  useEffect(() => {
    if (!loading && myAssets && myAssets?.length > 0 && !isMobile) {
      const first = myAssets.filter(asset => !asset.parent)[0];
      history.push(getAssetsSinglePath(first.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAssets]);

  return <div className="assets-page">{t("assetsPage")}</div>;
};

export default Index;
