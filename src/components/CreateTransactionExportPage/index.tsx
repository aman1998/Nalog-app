import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import isEmpty from "lodash/isEmpty";
import { useHistory } from "react-router";
import get from "lodash/get";

import { minLaptopMediaWidth, QUERIES } from "config/constants";
import { getDocumentTransactionExportPage } from "config/paths";

import {
  createUploadOperationsSelector,
} from "store/reports/selectors";
import {
  createTransactionExportRequest,
  setCreateTransitionExportCurrentStep,
  setReportModals
} from "store/reports/reducers";
import { showModal as showModalAction } from "store/assets/reducers";
import { TCreateTransitionExportSteps } from "store/reports/types";
import { makeSelectTransactionsList } from "store/transactions/selectors";


import useQuery from "../../hooks/useQuery";

import StepWidget, { TStep } from "../StepWidget";
import PlusIcon from "../Icons/PlusIcon";
import Button from "../Buttons/Button";

import TransactionExportCancelCreate from "./components/TransactionExportCancelCreate";
import TransactionExportStepTwo from "./components/TransactionExportStepTwo";
import TransactionExportStepThree from "./components/TransactionExportStepThree";
import TransactionExportStepOne from "./components/TransactionExportStepOne";

type CreateTransactionExportPageProps = {
  reportId?: string;
}

const CreateTransactionExportPage: FC<CreateTransactionExportPageProps> = ({ reportId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);
  const isDesktop = useMediaQuery({ query: `(min-width: ${minLaptopMediaWidth}px)` });
  const createUploadOperations =
    useSelector(createUploadOperationsSelector(id));
  const currentStep =  get(createUploadOperations, ['currentStep'], TCreateTransitionExportSteps.one);
  const assetsCheckList =  get(createUploadOperations, ['stepOne', 'assetsCheckList']);
  const { date_from, date_to, language, types } = get(createUploadOperations, ['stepTwo'],
    { date_from: undefined, date_to: undefined, language: undefined, types: undefined });

  const list = useSelector(makeSelectTransactionsList);

  const setStep = ($step: TCreateTransitionExportSteps) => {
    dispatch(setCreateTransitionExportCurrentStep({ id, currentStep: $step }));
  };

  const handleClickSteps = (newIndex: TCreateTransitionExportSteps) => {
    setStep(newIndex);
  };

  const handleCreateTransactionExport = () => {
    dispatch(createTransactionExportRequest({
      data: {
        report_id: reportId,
        accounts: assetsCheckList,
        date_from,
        date_to,
        types,
        language
      },
      callback: ($id: string) =>
        history.push(`${getDocumentTransactionExportPage($id)}?${QUERIES.fromCreateExport}=true`)
    }));
  };

  const steps: TStep<TCreateTransitionExportSteps>[] = [
    {
      index: TCreateTransitionExportSteps.one,
      next: () => {handleClickSteps(TCreateTransitionExportSteps.two);},
      disableNext: !(assetsCheckList && assetsCheckList?.length > 0),
      prev: () => dispatch(setReportModals({ key: "cancelCreate", value: true })),
      nextButton: t('naming.further'),
      title: t("transitionExportSteps.transactionSources"),
      mobileTitle: t("transitionExportSteps.transactionSourcesStep"),
      content: <TransactionExportStepOne/>,
      widget: isDesktop ? <Button
        icon={<PlusIcon />}
        title={t('action.addExchangesOrWallets')}
        onClick={() => dispatch(showModalAction(true))}
        className="create-document__step-one__add-btn"
      /> : undefined
    },
    {
      index: TCreateTransitionExportSteps.two,
      next: () => {handleClickSteps(TCreateTransitionExportSteps.three);},
      disableNext: !date_from || !date_to || !language || types?.length === 0,
      prev: () => handleClickSteps(TCreateTransitionExportSteps.one),
      nextButton: t('naming.further'),
      title: t("transitionExportSteps.options"),
      mobileTitle: t("transitionExportSteps.optionsStep"),
      content: <TransactionExportStepTwo/>
    },
    {
      index: TCreateTransitionExportSteps.three,
      prev: () => handleClickSteps(TCreateTransitionExportSteps.two),
      next: () => {
        isEmpty(list)
          ? handleClickSteps(TCreateTransitionExportSteps.two)
          : handleCreateTransactionExport();
      },
      nextButton: !isEmpty(list) ?  t('action.generate') : t('naming.back'),
      title: t("transitionExportSteps.preview"),
      mobileTitle: t("transitionExportSteps.previewStep"),
      content: <TransactionExportStepThree/>
    },
  ];

  return (
    <>
      <StepWidget
        title={t("documentCreateModalForm.transactionsExportTitle")}
        loading={false}
        steps={steps}
        current={currentStep}
        onClickStep={handleClickSteps}
      />
      <TransactionExportCancelCreate/>
    </>
  );
};

export default CreateTransactionExportPage;