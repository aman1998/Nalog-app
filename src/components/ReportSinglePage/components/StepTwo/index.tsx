import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";

import Button from "components/Buttons/Button";
import PlusIcon from "components/Icons/PlusIcon";

import {
  reportTransactionsDataSelector, reportTransactionsTypeSelector,
} from "store/reports/selectors";
import { openAddModal } from "store/transactions/reducers";
import { EReportTransactionType } from "store/reports/types";

import ReportTransactionList from "../ReportTransactionList";

import StepTwoTransactionAddModal from "./components/StepTwoTransactionAddModal";
import StepTwoHeader from "./components/StepTwoHeader";
import StepTwoTabs from "./components/StepTwoTabs";

const StepTwo: FC = () => {
  const { t } = useTranslation();
  const data = useSelector(reportTransactionsDataSelector);
  const type = useSelector(reportTransactionsTypeSelector);

  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });

  const dispatch = useDispatch();
  const showHeader = (!isMobile && !!data.length) || type === EReportTransactionType.filter;

  return (
    <div className="create-document__step-two">
      {isMobile && (
        <StepTwoTabs />
      )}
      { showHeader
        ? <StepTwoHeader />
        : (
          <div className="create-document__step-two__add-btn-wrapper container">
            <Button
              icon={<PlusIcon />}
              title={t('action.addOperations')}
              className="create-document__step-two__add-btn"
              onClick={() => dispatch(openAddModal())}
            />
          </div>
        )}
      <ReportTransactionList />
      <StepTwoTransactionAddModal />
    </div>
  );
};

export default StepTwo;
