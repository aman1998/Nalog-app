import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";

import SearchInput from "components/Inputs/SearchInput";
import Button from "components/Buttons/Button";

import { showModal as showModalAction } from "store/assets/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import AssetsModal from "../AssetsModal";
import AssetsList from "../AseetsList";


const AssetsSidebar = (): JSX.Element => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");

  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(showModalAction(true));
    dispatch(analyticEvent(EEventType.WALLET_ADD_NEW));
  };

  return (
    <aside className="assets-sidebar">
      <div className="assets-form">
        <Button
          title={isMobile ? "+" : t('action.add')}
          onClick={showModal}
          className="assets-btn"
        />
        <SearchInput setSearch={setSearch} />
      </div>
      <AssetsList searchValue={search} />
      <AssetsModal />
    </aside>
  );
};

export default AssetsSidebar;
