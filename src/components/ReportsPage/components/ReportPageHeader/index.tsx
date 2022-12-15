import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import Title from "components/Title";
import PromptIcon from "components/Icons/PromptIcon";
import Button from "components/Buttons/Button";

import { changeHintTextStatusRequest, showHintText } from "store/reports/reducers";
import {
  getAssetsHintTextDataSelector,
  getAssetsHintTextVisibleSelector,
} from "store/reports/selectors";
import { openModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";

import DocumentPrompt from "../DocumentPrompt";
import DocumentCreateModal from "../DocumentCreateModal";

const ReportPageHeader: FC = () => {
  const { t } = useTranslation();
  const textHintData = useSelector(getAssetsHintTextDataSelector);
  const visibleTextHint = useSelector(getAssetsHintTextVisibleSelector);

  const dispatch = useDispatch();

  const handlePromptOpen = () => {
    if (textHintData) { dispatch(changeHintTextStatusRequest(
      { hint_code: process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT, visible: !visibleTextHint }));
    }
    dispatch(showHintText(!visibleTextHint));
  };

  const onClickFormDocument = () => {
    dispatch(openModal(EModals.documentCreateModal));
  };
  
  return <div className="documents-page__header">
    <div className="container">
      <Title title={t('naming.documents')} className="report-left-side_title title report-left-side__title-wrapper"/>
      <p>{t("documentPage.helpText")}</p>
      <Button
        title={t("documentPage.newDocument")}
        className="btn-document"
        onClick={onClickFormDocument}
      />
      {false && <div onClick={handlePromptOpen} className={cn("report-left-side__icon-wrapper", {
        reportLeftSideIconWrapperActive: visibleTextHint
      })}>
        <PromptIcon/>
      </div>}
    </div>

    {false && <DocumentPrompt/>}
    <DocumentCreateModal/>
  </div>;
};

export default ReportPageHeader;