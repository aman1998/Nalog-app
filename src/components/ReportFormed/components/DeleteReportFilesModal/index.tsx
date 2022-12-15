import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DangerIcon from "components/Icons/DangerIcon";
import Button from "components/Buttons/Button";
import ConfirmModal from "components/ConfirmModal";

import {
  deleteSingleTaxReportConfirmedModalSelector,
  deleteSingleTaxReportFetchingSelector
} from "store/reports/selectors";
import { deleteSingleTaxReportConfirmedModal, deleteSingleTaxReportRequest } from "store/reports/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const DeleteReportFilesModal: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const visible = useSelector(deleteSingleTaxReportConfirmedModalSelector);
  const loadingDelete = useSelector(deleteSingleTaxReportFetchingSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  return <ConfirmModal
    title={t("report.wantDelete")}
    text={t("action.enteredDataLost")}
    icon={<DangerIcon />}
    visible={visible}
    btns={
      <>
        <Button
          title={t("action.cancel")}
          transparent={true}
          onClick={() => dispatch(deleteSingleTaxReportConfirmedModal(false))}
        />
        <Button
          title={t("action.delete")}
          danger={true}
          loading={loadingDelete}
          disabled={loadingDelete}
          onClick={() => dispatch(deleteSingleTaxReportRequest({
            id,
            redirect: (redirectId: string) => {
              dispatch(analyticEvent(EEventType.TAXREPORT_FORMED_ALL_DELETE));
              history.push(redirectId);
            }
          }))}
        />
      </>
    }
  />;
};

export default DeleteReportFilesModal;