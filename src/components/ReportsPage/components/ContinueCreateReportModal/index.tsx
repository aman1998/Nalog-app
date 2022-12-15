import  { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { mobileMediaWidth } from "config/constants";

import ConfirmModal from 'components/ConfirmModal';
import Button from "components/Buttons/Button";
import NoteIcon from "components/Icons/AssetNoteIcon";

import { continueCreateReportModalSelector, getThisYearFormingReport, } from "store/reports/selectors";
import { deleteSingleTaxReportRequest, setReportModals } from "store/reports/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const ContinueCreateReportModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const thisYearFormingReport = useSelector(getThisYearFormingReport);
  const continueCreate = useSelector(continueCreateReportModalSelector);
  const history = useHistory();

  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const onCancel = () => {
    dispatch(setReportModals({ key: "continueCreate", value: false }));
  };

  const onClickNew = () => {
    dispatch(analyticEvent(EEventType.DOCS_POPUP_CONTINUE_TAXREPORT_CREATE_NEW));
    dispatch(deleteSingleTaxReportRequest(
      {
        id: thisYearFormingReport?.id,
        callback: () => history.push(paths.REPORT_CONSTRUCTOR)
      }));
    onCancel();
  };

  const onClickContinue = () => {
    dispatch(analyticEvent(EEventType.DOCS_POPUP_CONTINUE_TAXREPORT_YES));
    history.push(`${paths.REPORT_CONSTRUCTOR}/${thisYearFormingReport?.id}`);
    onCancel();

    dispatch(analyticEvent(EEventType.DOCS_TAXREPORT_DRAFT_OPEN));
  };

  return <ConfirmModal
    title={t("continueCreateReportModal.title")}
    text={t("continueCreateReportModal.text")}
    icon={<NoteIcon />}
    visible={continueCreate}
    btns={
      <>
        <Button title={t("continueCreateReportModal.startOver")} transparent={true} onClick={onClickNew} />
        <Button title={t("action.proceed")} onClick={onClickContinue} />
      </>
    }
    onCancel={onCancel}
    width={isMobile ? 360 : 416}
  />;
};

export default ContinueCreateReportModal;
