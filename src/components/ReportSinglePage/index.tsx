import { FC, useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import {
  getSingleTaxReportRequest,
  resetCreateDocument,
} from "store/reports/reducers";
import {
  createDocumentSelector,
} from "store/reports/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { ECreateDocumentSteps } from "store/reports/types";

import StepTwoCheckUnConfirmedOperationsModal from "./components/StepTwoCheckUnConfirmedOperationsModal";
import ReportContent from "./components/ReportContent";

const ReportSinglePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const stepRef = useRef<number>();
  const { currentStep } = useSelector(createDocumentSelector);

  const dispatch = useDispatch();
  const history = useHistory();
  
  const unloadCallback = () => {
    switch (stepRef.current) {
    case ECreateDocumentSteps.one:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_EXIT));
      break;
    case ECreateDocumentSteps.two:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP2_EXIT));
      break;
    case ECreateDocumentSteps.three:
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_EXIT));
      break;
    }
  };
  
  useEffect(() => {
    dispatch(
      getSingleTaxReportRequest({
        id,
        redirect: (path: string) => history.push(path),
      })
    );
    return () => {
      unloadCallback();
      dispatch(resetCreateDocument());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  return (
    <Fragment>
      <ReportContent id={id} />
      <StepTwoCheckUnConfirmedOperationsModal />
    </Fragment>
  );
};

export default ReportSinglePage;
