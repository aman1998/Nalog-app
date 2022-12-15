import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";
import { paths } from "config/paths";

import Button from "components/Buttons/Button";
import NoteIcon from "components/Icons/AssetNoteIcon";
import ConfirmModal from "components/ConfirmModal";

import { deleteSingleTaxReportRequest, setReportModals } from "store/reports/reducers";
import { cancelCreateReportModalSelector } from "store/reports/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { ECreateDocumentSteps } from "store/reports/types";

const ReportCancelCreate: FC<{ current: number }> = ({ current }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const cancelCreate = useSelector(cancelCreateReportModalSelector);
  const history = useHistory();

  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const onCancel = () => dispatch(setReportModals({ key: "cancelCreate", value: false }));
  
  const sendStatistic = () => {
    switch (current) {
    case ECreateDocumentSteps.one:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_CANCEL),
      );
      return;
    case ECreateDocumentSteps.two:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_CANCEL));
      return;
    case ECreateDocumentSteps.three:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_CANCEL));
      return;
    }
  };
  
  const onSubmit = () => {
    sendStatistic();
    if (id) {
      dispatch(
        deleteSingleTaxReportRequest({
          id,
        })
      );
    }
    onCancel();
    history.push(paths.DOCUMENTS);
  };

  return (
    <ConfirmModal
      title={t("reportCancelCreate.title")}
      text={t("reportCancelCreate.text")}
      icon={<NoteIcon />}
      visible={cancelCreate}
      btns={
        <>
          <Button title={t("naming.yes")} transparent={true} onClick={onSubmit} />
          <Button title={t("naming.no")} onClick={onCancel} />
        </>
      }
      onCancel={onCancel}
      width={isMobile ? 360 : 416}
    />
  );
};

export default ReportCancelCreate;
