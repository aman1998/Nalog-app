import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";
import { paths } from "config/paths";

import Button from "components/Buttons/Button";
import NoteIcon from "components/Icons/AssetNoteIcon";
import ConfirmModal from "components/ConfirmModal";

import { setReportModals } from "store/reports/reducers";
import { cancelCreateReportModalSelector } from "store/reports/selectors";

const TransactionExportCancelCreate: FC= () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cancelCreate = useSelector(cancelCreateReportModalSelector);
  const history = useHistory();

  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const onCancel = () => dispatch(setReportModals({ key: "cancelCreate", value: false }));

  const onSubmit = () => {
    onCancel();
    history.push(paths.DOCUMENTS);
  };

  return (
    <ConfirmModal
      title={t("transitionExportCancelCreate.title")}
      text={t("transitionExportCancelCreate.text")}
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

export default TransactionExportCancelCreate;
