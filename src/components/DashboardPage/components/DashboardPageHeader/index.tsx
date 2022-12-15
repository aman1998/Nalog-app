import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import Title from "components/Title";
import PromptIcon from "components/Icons/PromptIcon";

import { changeHintTextStatusRequest, showHintText } from "store/reports/reducers";
import { getAssetsHintTextDataSelector, getAssetsHintTextVisibleSelector } from "store/reports/selectors";

import DashboardPrompt from "../DashboardPrompt";

const DashboardPageHeader: FC = () => {
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

  return <>
    <div className="report-left-side__title-wrapper">
      <Title title={t('naming.dashboard')} className="report-left-side_title title"/>
      { false &&
      <div onClick={handlePromptOpen} className={cn("report-left-side__icon-wrapper", {
        reportLeftSideIconWrapperActive: visibleTextHint
      })}>
        <PromptIcon/>
      </div>
      }
    </div>
    {false && <DashboardPrompt/>}
  </>;
};

export default DashboardPageHeader;
