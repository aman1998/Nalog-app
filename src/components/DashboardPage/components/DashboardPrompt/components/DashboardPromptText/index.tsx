import { Fragment, FC } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { mobileMediaWidth } from "config/constants";

const DashboardPromptText: FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  return <Fragment>
    <ul className="dashboard-prompt-text">
      <li>
        <p className="dashboard-prompt-text__head">
          {isMobile
            ? t('dashboardPrompt.part1HeadMobile')
            : t('dashboardPrompt.part1Head')
          }
        </p>
        <p className="dashboard-prompt-text__text">
          {t('dashboardPrompt.part1Text1')} “<NavLink to={paths.ASSETS}>
            {t('naming.exchangesAndWallets')}
          </NavLink>”,
          {t('dashboardPrompt.part1Text2')}
        </p>
      </li>
      <li>
        <p className="dashboard-prompt-text__head">{t('dashboardPrompt.part2Head')}</p>
        <p className="dashboard-prompt-text__text">{t('dashboardPrompt.part2Text')}</p>
      </li>
      <li>
        <p className="dashboard-prompt-text__head">{t('dashboardPrompt.part3Head')}</p>
        <p className="dashboard-prompt-text__text">
          {t('dashboardPrompt.part3Text1')} “<NavLink to={paths.DOCUMENTS}>{t('naming.documents')}</NavLink>”,
          {t('dashboardPrompt.part3Text2')}!</p>
      </li>
    </ul>

  </Fragment>;
};

export default DashboardPromptText;
