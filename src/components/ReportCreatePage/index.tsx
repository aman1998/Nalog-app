import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { paths } from "config/paths";
import { minLaptopMediaWidth } from "config/constants";

import StepWidget, { TStep } from "components/StepWidget";
import Button from "components/Buttons/Button";
import PlusIcon from "components/Icons/PlusIcon";

import {
  createTaxReportingProjectRequest,
  setReportModals,
} from "store/reports/reducers";
import {
  assetsCheckListSelector,
  assetsIncludesManualsSelector,
  createTaxReportingProjectFetchingSelector
} from "store/reports/selectors";
import { ECreateDocumentSteps } from "store/reports/types";
import { showModal as showModalAction } from "store/assets/reducers";

import ReportCancelCreate from "../ReportConstructor/components/ReportCancelCreate";

import StepOne from "./components/StepOne";

const ReportCreatePage: FC = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: `(min-width: ${minLaptopMediaWidth}px)` });
  const dispatch = useDispatch();
  const history = useHistory();

  const checkedList = useSelector(assetsCheckListSelector);
  const includesManuals = useSelector(assetsIncludesManualsSelector);
  const loading = useSelector(createTaxReportingProjectFetchingSelector);

  const steps: TStep<ECreateDocumentSteps>[] = [
    {
      index: ECreateDocumentSteps.one,
      next: () => {
        dispatch(createTaxReportingProjectRequest(
          {
            accounts: checkedList,
            include_manuals: includesManuals,
            year: "2021",
            redirect: (id: string) => history.push(`${paths.REPORT_CONSTRUCTOR}/${id}`)
          })
        );
      },
      prev: () => dispatch(setReportModals({ key: "cancelCreate", value: true })),
      nextButton: t('naming.further'),
      title: t("createReportSteps.transactionSources"),
      mobileTitle: t("createReportSteps.transactionSourcesStep"),
      content: <StepOne/>,
      widget: isDesktop ? <Button
        icon={<PlusIcon />}
        title={t('action.addExchangesOrWallets')}
        onClick={() => dispatch(showModalAction(true))}
        className="create-document__step-one__add-btn"
      /> : undefined
    },
    {
      index: ECreateDocumentSteps.two,
      title: t("createReportSteps.listOfOperations"),
      mobileTitle: t("createReportSteps.listOfOperationsStep"),
    },
    {
      index: ECreateDocumentSteps.three,
      title: t("createReportSteps.personalInformation"),
      mobileTitle: t("createReportSteps.personalInformationStep"),
    },
  ];

  return (
    <>
      <StepWidget
        title={t("naming.declarationFor", { year: 2021 })}
        loading={loading}
        steps={steps}
        current={ECreateDocumentSteps.one}
      />
      <ReportCancelCreate current={ECreateDocumentSteps.one}/>
    </>
  );
};

export default ReportCreatePage;
