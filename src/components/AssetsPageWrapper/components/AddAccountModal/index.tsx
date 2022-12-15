import { FC, memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

import SearchInput from "components/Inputs/SearchInput";
import List from "components/List";
import PopUp from "components/PopUp";

import { getAssetsDataSelector, getAssetsFetchingSelector, showModalSelector } from "store/assets/selectors";
import { getAssetsRequest } from "store/assets/reducers";
import { TAssetsData } from "store/assets/types";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import AddAccountModalList from "./components/AddAccountModalList";
import AddModalTab from "./components/AddModalTab";
import { useAddAccountType } from "./hooks";
import { AddAccountModalProps } from "./types";

const AddAccountModal: FC<AddAccountModalProps> = memo(({ setSelectedAsset, showPopUp, setShowPopUp }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string|undefined>();
  const { type, setType } = useAddAccountType();
  const visible = useSelector(showModalSelector);
  const { assetsShowTooltip } = useSelector(dashboardOnboardingSelector);
  const data = useSelector(getAssetsDataSelector);
  const loading = useSelector(getAssetsFetchingSelector);

  useEffect(() => {
    dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_START));
    if (!data) dispatch(getAssetsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPreloader = () => (
    <div className="assets-preloader">
      <Spin />
    </div>
  );

  return (
    <>
      <div className="add-modal">
        <div className="add-modal_header">
          <h1 className="add-modal_title">{t('naming.addingAccount')}</h1>
          <div className="add-modal_filter">
            <SearchInput setSearch={debounce(setSearchValue, 400)} className="filter-input_wrapper" />
            <AddModalTab type={type} setType={setType}/>
          </div>
        </div>
        <div className={cn("add-modal_list", { _isLoadingAddModal: loading })}>
          <List<TAssetsData>
            component={<AddAccountModalList type={type} searchValue={searchValue} setSelectedAsset={setSelectedAsset}/>}
            loading={loading}
            preloader={getPreloader()}
            emptyText={<h3 className="empty-text">{t('naming.listIsEmpty')}</h3>}
            data={data}
          />
        </div>
      </div>
      {visible && assetsShowTooltip && showPopUp
      && <PopUp
        title={t("assetsModal.addAccountPopUpTitle")}
        text={t("assetsModal.addAccountPopUpText")}
        setVisible={() => setShowPopUp(false)}
        relatedTo="pop-up__in-antd-model"
      />
      }
    </>
  );
});

export default AddAccountModal;
