import { FC, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from 'antd';
import { matchPath } from "react-router";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import PlusIcon from "components/Icons/PlusIcon";
import Button from "components/Buttons/Button";
import { TCheckboxChangeEvent, CheckboxValueType } from "components/BNCheckbox/types";
import AssetsModal from "components/AssetsPageWrapper/components/AssetsModal";

import {
  showModal as showModalAction
} from "store/assets/reducers";
import {
  getCreateDocumentAssetsListRequest,
  changeAssetsCheckList,
  changeIncludeManualStatus
} from "store/reports/reducers";
import {
  accountIdSelector
} from "store/assets/selectors";
import {
  getCreateDocumentAssetsDataSelector,
  assetsCheckListSelector,
  assetsSynchronizedListSelector,
  assetsIncludesManualsSelector,
} from "store/reports/selectors";
import { TMyAssetsData } from "store/assets/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import AssetCard from "./AssetCard";

const CheckboxGroup = Checkbox.Group;

const StepOne: FC = () => {
  const { t } = useTranslation();
  const assetsList = useSelector(getCreateDocumentAssetsDataSelector) || [];
  const checkedList = useSelector(assetsCheckListSelector);
  const synchronizedList = useSelector(assetsSynchronizedListSelector);
  const includesManuals = useSelector(assetsIncludesManualsSelector);
  const accountId = useSelector(accountIdSelector);

  const dispatch = useDispatch();

  const isHasSynchronizedAt = assetsList.some(item => !!item.synchronized_at);
  const manualAssets = assetsList.find(item => !item.id);

  const onChange = (list: CheckboxValueType[]): void => {
    dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_ACCOUNTS_CHANGED));

    dispatch(changeAssetsCheckList(list));
  };

  const onCheckAllChange = (e: TCheckboxChangeEvent) => {
    dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_ACCOUNTS_CHANGED));

    dispatch(changeAssetsCheckList(e.target.checked ? synchronizedList : []));
    dispatch(changeIncludeManualStatus(e.target.checked));
  };

  const handleManualStatus = (e: TCheckboxChangeEvent) => {
    dispatch(changeIncludeManualStatus(e.target.checked));
  };

  const onClickBox = (item: TMyAssetsData) => {
    if (checkedList.includes(item.id)) {
      dispatch(changeAssetsCheckList(checkedList.filter(value => value !== item.id)));
    } else {
      dispatch(changeAssetsCheckList([...checkedList, item.id]));
    }
  };

  useEffect(() => {
    dispatch(getCreateDocumentAssetsListRequest([
      { key: "details", value: "transaction_count" },
      { key: "include_manuals", value: "true" },
      { key: "include_subaccounts", value: "true" },
    ]));
  }, [dispatch, accountId]);

  useEffect(() => {
    if (matchPath(location.pathname, paths.REPORT_CONSTRUCTOR)?.isExact) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_NEW_CREATED));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="create-document__step-one container">
      <div className="create-document__step-one__header">
        <p className="create-document__step-one__text">
          {t("createReportStepOne.text")}
        </p>
        <div className="create-document__step-one__add-btn-wrapper">
          <Button
            icon={<PlusIcon/>}
            title={t('action.addExchangesOrWallets')}
            onClick={() => dispatch(showModalAction(true))}
            className="create-document__step-one__add-btn"
          />
        </div>
      </div>
      <div>
        {!!assetsList.length &&
        <Fragment>
          <Checkbox
            onChange={onCheckAllChange}
            checked={
              assetsList.filter(item => !!item.synchronized_at).length === checkedList.length && includesManuals
            }
            disabled={!isHasSynchronizedAt}
            className="create-document__step-one__all-check"
          >
            <span className="create-document__step-one__all-check-text">{t("action.chooseAll")}</span>
          </Checkbox>
          <CheckboxGroup value={checkedList} onChange={onChange}
            className="create-document__step-one__check-wrapper">
            {
              assetsList
                .filter(item => item.id)
                .map((item: TMyAssetsData) =>
                  <AssetCard key={item.id} item={item} onClickBox={() => onClickBox(item)}/>)
            }
          </CheckboxGroup>
        </Fragment>
        }
      </div>
      {!!manualAssets &&
      <>
        <div className="create-document__step-one__line"/>
        <div onClick={() => dispatch(changeIncludeManualStatus(!includesManuals))}
          className="create-document__step-one__check create-document__step-one__check--manual">
          <div className="check-content-wrapper">
            <div className="check-title">{t("createReportStepOne.operationsAddedManually")}</div>
            <div className="check-text">
              {t("operations.count", { count: manualAssets.transaction_count || 0 })}
            </div>
          </div>
          <div className="check-checkbox-wrapper">
            <Checkbox value="manual" onChange={handleManualStatus} checked={includesManuals}/>
          </div>
        </div>
      </>
      }
      <AssetsModal/>
    </div>
  );
};

export default StepOne;
