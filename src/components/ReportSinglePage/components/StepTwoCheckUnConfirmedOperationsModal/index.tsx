import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import ConfirmModal from 'components/ConfirmModal';
import NoteIcon from "components/Icons/AssetNoteIcon";
import Button from "components/Buttons/Button";

import { reportAgreementRequest, setReportModals } from "store/reports/reducers";
import {
  detailRequiredTaxTransactionTypesSelector,
  stepTwoUnconfirmedOperationModalSelector
} from "store/reports/selectors";

const StepTwoCheckUnConfirmedOperationsModal: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const visible = useSelector(stepTwoUnconfirmedOperationModalSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const detailRequired = useSelector(detailRequiredTaxTransactionTypesSelector);

  const onCancel = () => {
    dispatch(setReportModals({ key: "stepTwoUnconfirmedOperation", value: false }));
  };

  const onConfirm = () => {
    dispatch(reportAgreementRequest(id));
    onCancel();
  };

  return <ConfirmModal
    title={t("operations.confirmOperationList")}
    // text={`У вас есть ${detailRequired?.count || "???"} ${operationsPlural}, требующих доп. данных`}
    text={detailRequired?.count
      ? t("operations.confirmOperationListText", { count: detailRequired?.count })
      : t("operations.confirmOperationListTextUnknown", { count: detailRequired?.count })
    }
    icon={<NoteIcon />}
    visible={visible}
    btns={
      <>
        <Button title={t("action.confirm")} transparent={true} onClick={onConfirm} />
        <Button title={t("action.cancel")} onClick={onCancel} />
      </>
    }
    onCancel={onCancel}
    width={isMobile ? 360 : 416}
  />;
};

export default StepTwoCheckUnConfirmedOperationsModal;