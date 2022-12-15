import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import get from "lodash/get";

import { QUERIES } from "config/constants";

import Button from "components/Buttons/Button";
import PlusIcon from "components/Icons/PlusIcon";
import { CheckboxValueType, TCheckboxChangeEvent } from "components/BNCheckbox/types";
import AssetCard from "components/ReportCreatePage/components/StepOne/AssetCard";
import AssetsModal from "components/AssetsPageWrapper/components/AssetsModal";

import useQuery from "hooks/useQuery";

import {
  createUploadOperationsSelector,
} from "store/reports/selectors";
import {
  changeCreateTransitionExportAssetsCheckList,
  changeCreateTransitionExportIncludeManualStatus,
  changeIncludeManualStatus,
  getCreateTransitionExportAssetsListRequest
} from "store/reports/reducers";
import { showModal as showModalAction } from "store/assets/reducers";
import { TMyAssetsData } from "store/assets/types";

const CheckboxGroup = Checkbox.Group;

const TransactionExportStepOne: FC = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);
  const createUploadOperations
  = useSelector(createUploadOperationsSelector(id));
  const includeManuals = get(createUploadOperations, ['stepOne', 'includeManuals']);
  const synchronizedList = get(createUploadOperations, ['stepOne', 'synchronizedList']);
  const assetsCheckList = get(createUploadOperations, ['stepOne', 'assetsCheckList']);
  const assetsList = get(createUploadOperations, ['stepOne', 'assetsList', 'data'], []);

  const dispatch = useDispatch();

  const isHasSynchronizedAt = assetsList.some(item => !!item.synchronized_at);
  const manualAssets = assetsList.find(item => !item.id);

  const onChange = (list: CheckboxValueType[]): void => {
    dispatch(changeCreateTransitionExportAssetsCheckList({ id, assetsCheckList: list as string[] }));
  };

  const onCheckAllChange = (e: TCheckboxChangeEvent) => {
    dispatch(changeCreateTransitionExportAssetsCheckList({
      id, assetsCheckList: e.target.checked ? synchronizedList : [] }));
    dispatch(changeCreateTransitionExportIncludeManualStatus({ id, includeManuals: e.target.checked }));
  };

  const handleManualStatus = (e: TCheckboxChangeEvent) => {
    dispatch(changeCreateTransitionExportIncludeManualStatus({ id, includeManuals: e.target.checked }));
  };


  const onClickBox = (item: TMyAssetsData) => {
    if (assetsCheckList && assetsCheckList.includes(item.id)) {
      onChange(assetsCheckList.filter(value => value !== item.id));
    } else if (assetsCheckList) {
      onChange([...assetsCheckList, item.id]);
    }
  };

  useEffect(() => {
    dispatch(getCreateTransitionExportAssetsListRequest({ 
      id,
      query: [
        { key: "details", value: "transaction_count" },
        { key: "include_manuals", value: "true" },
        { key: "include_subaccounts", value: "true" },
      ] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="create-document__step-one container">
      <div className="create-document__step-one__header">
        <p className="create-document__step-one__text">
          {t("createTransactionExportStepOne.text")}
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
              assetsList.filter(item => !!item.synchronized_at).length === assetsCheckList?.length && includeManuals
            }
            disabled={!isHasSynchronizedAt}
            className="create-document__step-one__all-check"
          >
            <span className="create-document__step-one__all-check-text">{t("action.chooseAll")}</span>
          </Checkbox>
          <CheckboxGroup value={assetsCheckList ? assetsCheckList : []} onChange={onChange}
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
        <div onClick={() => dispatch(changeIncludeManualStatus(!includeManuals))}
          className="create-document__step-one__check create-document__step-one__check--manual">
          <div className="check-content-wrapper">
            <div className="check-title">{t("createReportStepOne.operationsAddedManually")}</div>
            <div className="check-text">
              {t("operations.count", { count: manualAssets.transaction_count || 0 })}
            </div>
          </div>
          <div className="check-checkbox-wrapper">
            <Checkbox value="manual" onChange={handleManualStatus} checked={includeManuals}/>
          </div>
        </div>
      </>
      }
      <AssetsModal/>
    </div>
  );
};

export default TransactionExportStepOne;