import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { ELinks } from "config/types";

import ArrowIcon from "components/Icons/ArrowSmallIcon";

import useOnClickOutside from "hooks/useOnClickOutside";

import { getUserInfoDataSelector } from "store/user/selectors";

import { IOtherNavigation } from "./types";

const OtherNavigation: FC<IOtherNavigation> = ({ logout }) => {
  const [nav, setNav] = useState(false);
  const { t } = useTranslation();

  const data = useSelector(getUserInfoDataSelector);

  const clickedRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref: wrapperRef, handler: () => setNav(false), clickedRef });

  return (
    <nav className="other-navigation">
      <div className="other-navigation_btn" onClick={() => setNav(prev => !prev)} ref={clickedRef}>
        <div className="other-navigation_btn__text">{data?.username || data?.email || data?.phone}</div>
        <div
          className={cn("other-navigation_icon", {
            _iconActive: nav,
          })}
        >
          <ArrowIcon />
        </div>
      </div>
      <div
        ref={wrapperRef}
        className={cn("other-navigation_dropdown", {
          _dropdownActive: nav,
        })}
      >
        <NavLink
          to="/settings"
          activeClassName="dropdown-item_active"
          className="dropdown-item"
          exact={true}
          onClick={prev => setNav(!prev)}
        >
          {t(ELinks.SETTINGS)}
        </NavLink>
        <div className="dropdown-item exit" onClick={logout}>
          {t('naming.logout')}
        </div>
      </div>
    </nav>
  );
};

export default OtherNavigation;
