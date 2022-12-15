import { FC, useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { paths } from "config/paths";

import Button from "components/Buttons/Button";

import { setCreateTransitionExportClear, setReportModals } from "store/reports/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { getThisYearFormingReport } from "store/reports/selectors";
import { closeModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";


export enum EDocumentCreateOptions {
  taxReturn =  "taxReturnFor",
  sourcesExport =  "sourcesExport",
  transactionsExport =  "transactionsExport",
}

const DocumentCreateModalForm: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState<EDocumentCreateOptions>(EDocumentCreateOptions.sourcesExport);
  const thisYearFormingReport = useSelector(getThisYearFormingReport);

  const handleOnChange = (e: RadioChangeEvent) => {
    setSelected(e.target.value as EDocumentCreateOptions);
  };

  const handleClickFurther = () => {
    dispatch(closeModal(EModals.documentCreateModal));

    switch (selected) {
    case EDocumentCreateOptions.taxReturn:
      if (thisYearFormingReport) {
        // open modal to chose to continue update or start new report
        dispatch(setReportModals({ key: "continueCreate", value: true }));
        dispatch(analyticEvent(EEventType.DOCS_POPUP_CONTINUE_TAXREPORT));
      } else {
        history.push(paths.REPORT_CONSTRUCTOR);
      }
      break;
    case EDocumentCreateOptions.transactionsExport:
      history.push(paths.DOCUMENTS_CREATE_TRANSACTION_EXPORT);
      break;
    case EDocumentCreateOptions.sourcesExport:
      history.push(paths.DOCUMENTS_CREATE_SOURCES_EXPORT);
    }
    dispatch(setCreateTransitionExportClear());
  };

  return <div className="document-create-modal-form">
    <Radio.Group onChange={handleOnChange} value={selected}>
      <Radio value={EDocumentCreateOptions.sourcesExport} className="document-create-modal-form__item">
        <h3 className="document-create-modal-form__item__title">
          {t("documentCreateModalForm.sourcesExportTitle")}
        </h3>
        <p className="document-create-modal-form__item__text">{t("documentCreateModalForm.sourcesExportText")}</p>
      </Radio>
      <Radio value={EDocumentCreateOptions.transactionsExport} className="document-create-modal-form__item">
        <h3 className="document-create-modal-form__item__title">
          {t("documentCreateModalForm.transactionsExportTitle")}
        </h3>
        <p className="document-create-modal-form__item__text">{t("documentCreateModalForm.transactionsExportText")}</p>
      </Radio>
      <Radio value={EDocumentCreateOptions.taxReturn} className="document-create-modal-form__item">
        <h3 className="document-create-modal-form__item__title">
          {t("documentCreateModalForm.taxReturnTitle", { year: 2021 })}
        </h3>
        <p className="document-create-modal-form__item__text">{t("documentCreateModalForm.taxReturnText")}</p>
      </Radio>
    </Radio.Group>
    <Button
      onClick={handleClickFurther}
      className="document-create-modal-form__btn"
      title={t("naming.further")}
    />
  </div>;
};

export default DocumentCreateModalForm;
