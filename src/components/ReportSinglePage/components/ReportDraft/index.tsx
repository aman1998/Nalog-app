import { FC, memo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormikProps } from "formik";
import xor from "lodash/xor";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth, minLaptopMediaWidth, TAX_REPORT_2021 } from "config/constants";

import ServiceModal from "components/ServiceModal";
import { EServiceModalSteps } from "components/ServiceModal/components/ServiceModalSteps/types";
import ReportCancelCreate from 'components/ReportConstructor/components/ReportCancelCreate';
import StepWidget, { TStep } from "components/StepWidget";
import StepOne from "components/ReportCreatePage/components/StepOne";
import Button from "components/Buttons/Button";
import PlusIcon from "components/Icons/PlusIcon";

import {
  assetsCheckListSelector, assetsIncludesManualsSelector, createDocumentIsAnonymousSelector,
  createDocumentSelector, createPersonalCompleteFetchingSelector, createPersonalFetchingSelector,
  createTaxReportingProjectFetchingSelector, detailRequiredTaxTransactionTypesSelector, getSingleTaxReportDataSelector,
  reportAgreementFetchingSelector, updateTaxReportAccountsFetchingSelector
} from "store/reports/selectors";
import { getUserInfoDataSelector } from "store/user/selectors";
import {
  changeSingleTaxReportCurrent, createPersonalDataRequest, reportAgreementRequest,
  setReportModals,
  updateTaxReportAccountsRequest
} from "store/reports/reducers";
import { ECreateDocumentSteps, ESingleTaxReportTransactionStatus, TNewReportOptionData } from "store/reports/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { showModal as showModalAction } from "store/assets/reducers";
import { openAddModal } from "store/transactions/reducers";

import ReportForming from "../../../ReportFormed/components/ReportForming";

import StepTwo from "../StepTwo";
import StepTwoTabs from "../StepTwo/components/StepTwoTabs";
import StepThree from "../StepThree";

import { ReportDraftProps } from "./types";

const ReportDraft: FC<ReportDraftProps> = memo(({ id }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const formikRef = useRef<FormikProps<TNewReportOptionData>>(null);
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: ${minLaptopMediaWidth}px)` });
  const { currentStep } = useSelector(createDocumentSelector);

  const checkedList = useSelector(assetsCheckListSelector);
  const includesManuals = useSelector(assetsIncludesManualsSelector);
  const transactionsStatus = useSelector(getSingleTaxReportDataSelector(id))?.transactions_status;
  const singleTaxReport = useSelector(getSingleTaxReportDataSelector(id));
  const includeManualsAPI = useSelector(getSingleTaxReportDataSelector(id))?.include_manuals;
  const user = useSelector(getUserInfoDataSelector);
  const detailRequired = useSelector(detailRequiredTaxTransactionTypesSelector);
  const isAnonymous = useSelector(createDocumentIsAnonymousSelector);
  const taxReportData = useSelector(getSingleTaxReportDataSelector(id));

  const stepOneLoading = useSelector(createTaxReportingProjectFetchingSelector);
  const stepThreeLoading = useSelector(createPersonalFetchingSelector);
  const stepTwoLoading = useSelector(reportAgreementFetchingSelector);
  const loadingComplete = useSelector(createPersonalCompleteFetchingSelector);
  const stepOneUpdateLoading = useSelector(updateTaxReportAccountsFetchingSelector);

  const setStep = ($step: ECreateDocumentSteps) => {
    dispatch(changeSingleTaxReportCurrent($step));
  };

  const handleClickSteps = (newIndex: ECreateDocumentSteps) => {
    if (currentStep === ECreateDocumentSteps.three && newIndex === ECreateDocumentSteps.two) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_TO_STEP2));
    } else if (currentStep === ECreateDocumentSteps.three && newIndex === ECreateDocumentSteps.one) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_TO_STEP1));
    } else if (currentStep === ECreateDocumentSteps.two && newIndex === ECreateDocumentSteps.one) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_TO_STEP1));
    }

    if (newIndex === ECreateDocumentSteps.one && transactionsStatus === ESingleTaxReportTransactionStatus.forming) {
      return;
    }
    setStep(newIndex);
  };

  const steps: TStep<ECreateDocumentSteps>[] = [
    {
      index: ECreateDocumentSteps.one,
      next: () => {
        switch (transactionsStatus) {
        case ESingleTaxReportTransactionStatus.not_formed:
        case ESingleTaxReportTransactionStatus.error:
          dispatch(
            updateTaxReportAccountsRequest({
              id,
              changeStepCallback: () => setStep(ECreateDocumentSteps.two),
              accounts: checkedList,
              include_manuals: includesManuals,
            })
          );
          break;
        case ESingleTaxReportTransactionStatus.confirmed:
        case ESingleTaxReportTransactionStatus.formed:
          if (xor(singleTaxReport?.accounts || [], checkedList).length || includeManualsAPI !== includesManuals) {
            dispatch(
              updateTaxReportAccountsRequest({
                id,
                changeStepCallback: () => setStep(ECreateDocumentSteps.two),
                accounts: checkedList,
                include_manuals: includesManuals,
              })
            );
          } else {
            setStep(ECreateDocumentSteps.two);
          }
          break;
        }
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
      next: () => {
        if (!user?.services.includes(TAX_REPORT_2021) && process.env.REACT_APP_TAX_REPORT_SERVICE_REQUIRED === "true") {

          dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_PAYMENT_REQUESTED));

          history.push({
            search: `?modal=${EServiceModalSteps.first}`, // openModal(EModals.activateServiceModal)
          });
        } else if (detailRequired && detailRequired.count > 0) {
          dispatch(setReportModals({ key: "stepTwoUnconfirmedOperation", value: true }));
        } else {
          dispatch(reportAgreementRequest(id));
        }
      },
      prev: () => handleClickSteps(ECreateDocumentSteps.one),
      nextButton: t('naming.further'),
      title: t("createReportSteps.listOfOperations"),
      mobileTitle: t("createReportSteps.listOfOperationsStep"),
      content: <StepTwo/>,
      widget: !isMobile ? <>
        <StepTwoTabs> 
          <Button
            icon={<PlusIcon />}
            title={t("action.addOperations")}
            className="create-document__step-two__add-btn"
            onClick={() => dispatch(openAddModal())}
          />
        </StepTwoTabs>
       
      </> : undefined
    },
    {
      index: ECreateDocumentSteps.three,
      next: () => {
        dispatch(createPersonalDataRequest({ id, isAnonymous, ...formikRef?.current?.values }));
      },
      prev: () => handleClickSteps(ECreateDocumentSteps.two),
      nextButton: t('action.generateDeclaration'),
      title: t("createReportSteps.personalInformation"),
      mobileTitle: t("createReportSteps.personalInformationStep"),
      content: <StepThree formikRef={formikRef}/>
    },
  ];

  const firstStepNext = () => {
    const $step = steps.find(s => s.index === ECreateDocumentSteps.one);

    if ($step && $step.next) {
      return $step.next();
    }
    return;
  };
  return (
    <>
      <StepWidget
        title={t("naming.declarationFor", { year: 2021 })}
        loading={stepOneLoading ||
        stepTwoLoading ||
        stepThreeLoading ||
        loadingComplete ||
        stepOneUpdateLoading ||
        singleTaxReport?.transactions_status === ESingleTaxReportTransactionStatus.forming}
        steps={steps}
        current={currentStep}
        onClickStep={handleClickSteps}
        defaultComponent={<ReportForming/>}
        showDefault={taxReportData?.transactions_status === ESingleTaxReportTransactionStatus.forming}
      />
      <ServiceModal finalCall={firstStepNext} />
      <ReportCancelCreate current={currentStep}/>
    </>
  );
});

export default ReportDraft;