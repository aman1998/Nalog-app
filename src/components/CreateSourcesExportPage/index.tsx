import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useMediaQuery } from "react-responsive";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { minLaptopMediaWidth, QUERIES } from "config/constants";
import { getDocumentSourcesExportPage } from "config/paths";

import { createUploadOperationsSelector } from "store/reports/selectors";
import { makeSelectTransactionsList } from "store/transactions/selectors";
import { TCreateTransitionExportSteps } from "store/reports/types";
import { showModal as showModalAction } from "store/assets/reducers";
import {
  createSourcesExportRequest,
  setCreateTransitionExportCurrentStep,
  setReportModals
} from "store/reports/reducers";

import useQuery from "../../hooks/useQuery";

import StepWidget, { TStep } from "../StepWidget";
import TransactionExportStepOne from "../CreateTransactionExportPage/components/TransactionExportStepOne";
import Button from "../Buttons/Button";
import PlusIcon from "../Icons/PlusIcon";
import TransactionExportStepTwo from "../CreateTransactionExportPage/components/TransactionExportStepTwo";
import TransactionExportStepThree from "../CreateTransactionExportPage/components/TransactionExportStepThree";
import TransactionExportCancelCreate from "../CreateTransactionExportPage/components/TransactionExportCancelCreate";

import { defaultOperations, operationTypes } from "./constants";

export type CreateSourcesExportPageProps = {
  reportId?: string;
}

const CreateSourcesExportPage: FC<CreateSourcesExportPageProps> = ({ reportId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);
  const isDesktop = useMediaQuery({ query: `(min-width: ${minLaptopMediaWidth}px)` });
  const createUploadOperations =
    useSelector(createUploadOperationsSelector(id));

  const currentStep = get(createUploadOperations, ['currentStep']);
  const stepOne = get(createUploadOperations, ['stepOne']);
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
    dispatch(createSourcesExportRequest({
      data: {
        report_id: reportId,
        accounts: stepOne?.assetsCheckList,
        date_from,
        date_to,
        types,
        language,
      },
      callback: ($id: string) =>
        history.push(`${getDocumentSourcesExportPage($id)}
          ?${QUERIES.fromCreateExport}=true
          &${QUERIES.createSourceId}=${id}`
        )
    }));
  };

  const steps: TStep<TCreateTransitionExportSteps>[] = [
    {
      index: TCreateTransitionExportSteps.one,
      next: () => {handleClickSteps(TCreateTransitionExportSteps.two);},
      disableNext: !(stepOne?.assetsCheckList && stepOne?.assetsCheckList?.length > 0),
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
      content: <TransactionExportStepTwo
        defaultOperations={defaultOperations}
        operationTypes={operationTypes}
      />
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
        title={t("documentCreateModalForm.sourcesExportTitle")}
        loading={false}
        steps={steps}
        current={currentStep || TCreateTransitionExportSteps.one}
        onClickStep={handleClickSteps}
      />
      <TransactionExportCancelCreate/>
    </>
  );
};

export default CreateSourcesExportPage;