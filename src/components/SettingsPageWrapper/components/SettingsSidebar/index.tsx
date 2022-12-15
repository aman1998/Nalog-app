import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SETTINGS_LINKS } from "./constants";

const SettingsSidebar = (): JSX.Element => {
  const { t } = useTranslation();
  
  return (
    <aside className="settings-sidebar_wrapper">
      <div className="settings-sidebar">
        <h1 className="settings-sidebar_title">{t('naming.settings')}</h1>
        <nav className="settings-sidebar_navigation">
          <ul>
            {
              SETTINGS_LINKS.filter(link => link.active).map(link => (
                <li className="settings-item" key={link.id}>
                  <NavLink
                    to={link.to}
                    className="link"
                    activeClassName="active-link"
                    exact={true}
                  >
                    {link.icon && <link.icon />}
                    <span>{t(link.title)}</span>
                  </NavLink>
                </li>
              ))
            }
            {/*
          // TODO: coming features
          <li className="settings-item">
            <NavLink
              to={paths.SETTINGS_REPORTS}
              className="link"
              activeClassName="active-link"
            >
              <ReportsIcon />
              <span>{t("naming.ELinks.SETTINGS_REPORTS)}</span>
            </NavLink>
          </li>
          <li className="settings-item">
            <NavLink
              to={paths.SETTINGS_OTHER}
              className="link"
              activeClassName="active-link"
            >
              <OtherIcon />
              <span>{t(ELinks.SETTINGS_OTHER)} </span>
            </NavLink>
          </li>
          */}
          </ul>
        </nav>
      </div>
    </aside>
  );};
export default SettingsSidebar;
