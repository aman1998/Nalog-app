import { FC } from 'react';
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ETariffPlan } from 'store/services/types';

import { userPlanInfoSelector } from "../../../../store/user/selectors";

import ProgressInfo from "../../../ProgressInfo";


export type TPricingProgressProps = {
  pricing?: ETariffPlan;
}

const PricingProgress: FC<TPricingProgressProps> = ({ pricing }) => {
  const { t } = useTranslation();
  const { data: userPlan } = useSelector(userPlanInfoSelector);
  
  const formFileStorage = () => {
    if (userPlan?.file_storage.used && userPlan?.file_storage.max) {
      return 100 - (userPlan?.file_storage.used * 100 / userPlan?.file_storage.max);
    }
    return 100;
  };

  const formNoteAndTags = () => {
    if (userPlan?.notes.used && userPlan?.notes.max) {
      return userPlan?.notes.max - userPlan?.notes.used;
    }
    return 25;
  };

  return (
    <div className={cn("pricing__card__processes", pricing )}>
      <ProgressInfo
        title={t("pricing.fileStorage")}
        number={formFileStorage()}
        max={100}
        unit={"MB"}
      />
      <ProgressInfo
        title={t("pricing.notesAndTags")}
        number={formNoteAndTags()}
        max={25}
      />
    </div>
  );
};

export default PricingProgress;