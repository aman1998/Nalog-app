import { useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import cn from "classnames";
import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { maxMobileMediaWidth, maxTableMediaWidth, NAVIGATION_LINKS } from "config/constants";

import { useTheme } from "components/ThemeSwitcher";
import { EThemes } from "components/ThemeSwitcher/types";
import { useLayoutAppNameContext } from "components/Layout/hooks";

import { clearAuthState, logout as logoutAction } from "store/auth/reducers";
import { getSingleAssetDataSelector } from "store/assets/selectors";
import { getUserInfoDataSelector } from "store/user/selectors";
import { clearAssetsState } from "store/assets/reducers";
import { clearUserState } from "store/user/reducers";
import { clearFilterState } from "store/filter/reducers";
import { clearTransactionsState } from "store/transactions/reducers";
import { clearReportsStoreState } from "store/reports/reducers";
import { TUserInfoData } from "store/user/types";
import { EEventType } from "store/analytics/types";
import { analyticEvent } from "store/analytics/effects";

import { getPageTitle } from "utils/history";
import { sendAmplitudeEvent, setAmplitudeRegenerateDeviceId, setAmplitudeUserId } from "utils/amplitudeAnalytic";
import { EStorageKeys } from "utils/storageHeplers";

import { useActiveNavLink } from "../../hooks";

import OtherNavigation from "../OtherNavigation";
import DrawerComponent from "../DrawerComponent";

const HeaderContent = ({ headerClass }: {headerClass: Record<string, unknown>}): JSX.Element => {
  const { logo }= useLayoutAppNameContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  const history = useHistory();
  const location = useLocation();
  const singleAssetData = useSelector(getSingleAssetDataSelector(location.pathname.split("/").pop()));
  const userData = useSelector(getUserInfoDataSelector);
  const isActive = useActiveNavLink();
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const logout = () => {
    localStorage.removeItem(EStorageKeys.TOKEN);
    sendAmplitudeEvent<TUserInfoData>(EEventType.LOGOUT, userData);
    dispatch(analyticEvent(EEventType.AUH_SESSION_LOGOUT));
    setAmplitudeUserId(null);
    setAmplitudeRegenerateDeviceId();
    dispatch(logoutAction());
    dispatch(clearAssetsState());
    dispatch(clearUserState());
    dispatch(clearAuthState());
    dispatch(clearFilterState());
    dispatch(clearTransactionsState());
    dispatch(clearReportsStoreState());
    if (isFunction(setTheme)) setTheme(EThemes.dark);
    history.push(paths.SIGN_IN);
  };

  const formPageTitle = () => {
    const pathname = location.pathname.replaceAll("/", "");
    const pathnameList = {
      assets: "assets",
      documents: "documents"
    };

    if (pathname.includes(pathnameList.assets) && pathname.length > pathnameList.assets.length) {
      return singleAssetData?.name;
    }

    if(pathname.includes(pathnameList.documents) && pathname.length > pathnameList.documents.length) {
      return t('naming.documents');
    }

    return getPageTitle("/" + pathname);
  };

  return (
    <header className={cn("header-wrapper", headerClass, { sticky: isMobile })}>
      <div className={cn("container header")}>
        {isMobile ? (
          <div className="header-title">{formPageTitle()}</div>
        ) : (
          <NavLink to={paths.HOME} exact={true} className="header-logo">
            {logo}
          </NavLink>
        )}
        <nav className="header-navigation">
          <ul className={cn("navigation-items")}>
            {NAVIGATION_LINKS.filter(link => link.active).map(link => (
              <li className="navigation-item" onClick={() => document.body.classList.remove("body-lock")} key={link.id}>
                <NavLink
                  to={link.to}
                  exact={true}
                  className="item-link"
                  activeClassName="item-link--active"
                  isActive={() => isActive(link.to)}
                >
                  {link.icon && <link.icon />}
                  <span>{t(link.title)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <MediaQuery minWidth={maxTableMediaWidth}>
          <div className="header-right">
            <OtherNavigation logout={logout} />
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={maxTableMediaWidth}>
          <DrawerComponent onClick={logout} />
        </MediaQuery>
      </div>
    </header>
  );
};

export default HeaderContent;
