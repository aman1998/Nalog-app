import { FC } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import HomeIcon from "components/Icons/HomeIcon";
import ExitIcon from "components/Icons/ExitIcon";
import { SETTINGS_LINKS } from "components/SettingsPageWrapper/components/SettingsSidebar/constants";

import { getUserInfoDataSelector } from "store/user/selectors";

const { SubMenu: AntSubmenu } = Menu;

const SubMenu: FC<{ onClose: () => void; logout: () => void }> = ({ onClose, logout }) => {
  const { t } = useTranslation();
  const data = useSelector(getUserInfoDataSelector);

  const location = useLocation();

  return (
    <div className="nav-item nav-item--submenu">
      <Menu
        mode="inline"
        className="submenu-nav-item"
        defaultOpenKeys={location.pathname.includes(paths.SETTINGS) ? ["submenu"] : [""]}
      >
        <AntSubmenu
          icon={
            <div className="link-logo">
              <HomeIcon />
            </div>
          }
          title={t('naming.settings')}
          key="submenu"
        >
          {SETTINGS_LINKS.filter(link => link.active).map(link => (
            <NavLink
              key={link.id}
              to={link.to}
              exact={true}
              className="nav-item_link"
              activeClassName="nav-item_link-active"
              onClick={onClose}
            >
              <span className="link-text">{t(link.title)}</span>
            </NavLink>
          ))}
        </AntSubmenu>
        <li className="nav-item nav-item--exit" onClick={logout}>
          <div className="nav-item_link">
            <div className="link-logo">
              <ExitIcon />
            </div>
            <span className="link-text">{t("naming.logout")}</span>
          </div>
        </li>
        <div className="nav-username">{data?.username || data?.email || data?.phone}</div>
      </Menu>
    </div>
  );
};

export default SubMenu;
