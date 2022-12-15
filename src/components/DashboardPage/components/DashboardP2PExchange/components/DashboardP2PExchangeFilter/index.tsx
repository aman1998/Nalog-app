import { FC } from 'react';
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";

import { ELanguages } from "../../../../../../i18n/constants";

import { getFilterTubs } from "./utils";
import { DashboardP2PExchangeFilterProps } from "./types";

const DashboardP2PExchangeFilter: FC<DashboardP2PExchangeFilterProps> = ({ fixedDate, setFixedDate }) => {
  const { t, i18n } = useTranslation();
  const extraSmall = useMediaQuery({ query: `(max-width: 340px)` });

  const formTitle = (title: string) => {
    if (extraSmall) return title.replace(/(?:\s)[^\]]+/, "...");
    return title;
  };

  return (
    <div className={cn("dashboard-p2p-exchange__filters", { en: i18n.language === ELanguages.enUS })}>
      {getFilterTubs(t).map(item => (
        <div
          key={item.value}
          className={cn("dashboard-p2p-exchange__filters__tab", { active: item.value === fixedDate })}
          onClick={() => setFixedDate(item.value)}
        >
          {formTitle(t(item.title))}
        </div>
      )
      )}
    </div>
  );
};

export default DashboardP2PExchangeFilter;