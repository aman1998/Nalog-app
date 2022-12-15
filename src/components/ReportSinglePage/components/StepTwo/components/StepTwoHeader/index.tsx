import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FC } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth, minTableMediaWidth } from "config/constants";

import { TCheckboxChangeEvent } from "components/BNCheckbox/types";

import { changeAllReportCheckStatusRequest } from "store/reports/reducers";
import {
  reportAgreementFetchingSelector,
  reportTransactionsAllCheckSelector, reportTransactionsTypeSelector
} from "store/reports/selectors";
import { EReportTransactionType } from "store/reports/types";

import StepTwoDesktopHeader from "../StepTwoDesktopHeader";
import StepTwoMobileHeader from "../StepTwoMobileHeader";


const StepTwoHeader: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const selectAllLoading = useSelector(reportAgreementFetchingSelector);
  const isAllChecked = useSelector(reportTransactionsAllCheckSelector);
  const type = useSelector(reportTransactionsTypeSelector);
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const dispatch = useDispatch();
  const showFilter = type === EReportTransactionType.filter;

  return <>
    {showFilter && <>
      <MediaQuery minWidth={minTableMediaWidth}>
        <StepTwoDesktopHeader />
      </MediaQuery>
      <MediaQuery maxWidth={maxMobileMediaWidth}>
        <StepTwoMobileHeader />
      </MediaQuery>
    </>}
    {!isMobile && <div className="create-document__step-two__header container">
      {!showFilter && <p className="create-document__step-two__header-text">
        {t("createReportStepTwo.text")}
      </p>
      }
      <Checkbox
        className="create-document__step-two__header-checkbox"
        checked={isAllChecked}
        disabled={selectAllLoading}
        onChange={(e: TCheckboxChangeEvent) =>
          dispatch(
            changeAllReportCheckStatusRequest({
              id,
              checked: e.target.checked,
              type,
            })
          )
        }
      >
        <span className="create-document__step-two__header-checkbox-text">{t("action.chooseAll")}</span>
      </Checkbox>
    </div>}
  </>;
};

export default StepTwoHeader;