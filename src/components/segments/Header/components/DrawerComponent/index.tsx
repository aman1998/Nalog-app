import { useState, FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth, NAVIGATION_LINKS } from "config/constants";

import { useLayoutAppNameContext } from "components/Layout/hooks";

import { useActiveNavLink } from "../../hooks";

import SubMenu from "../SubMenu";
import HeaderBurger from "../HeaderBurger";

const DrawerComponent: FC<{ onClick: () => void }> = ({ onClick }) => {
  const { t } = useTranslation();
  const { logo } = useLayoutAppNameContext();
  const [visible, setVisible] = useState(false);
  const isActive = useActiveNavLink();

  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  const handleDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="header-mobile">
      <HeaderBurger active={visible} onClick={handleDrawer}/>
      <Drawer
        width={isMobile ? "100%" : 328}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="drawer"
      >
        <div
          className={cn("drawer-logo", {
            _drawerLogoMobile: isMobile,
          })}
        >
          {logo}
          <div className="drawer-close">
            <HeaderBurger active={true} onClick={onClose}/>
          </div>
        </div>
        <nav className="drawer-nav">
          <ul>
            {NAVIGATION_LINKS.filter(link => link.active).map(link => (
              <li className="nav-item" onClick={onClose} key={link.id}>
                <NavLink
                  isActive={() => isActive(link.to)}
                  to={link.to}
                  exact={true}
                  className="nav-item_link"
                  activeClassName="nav-item_link-active"
                >
                  <div className="link-logo">
                    {link.icon && <link.icon />}
                  </div>
                  <span className="link-text">{t(link.title)}</span>
                </NavLink>
              </li>
            ))}
            <SubMenu onClose={onClose} logout={onClick} />
          </ul>
        </nav>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
