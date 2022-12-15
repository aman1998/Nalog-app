import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";
import isFunction from "lodash/isFunction";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { paths } from "config/paths";
import { EAppNames, TChildren } from "config/types";

import GoogleAnalytics from "components/GoogleAnalytics";
import AssetsPageWrapper from "components/AssetsPageWrapper";
import SettingsPageWrapper from "components/SettingsPageWrapper";
import Header from "components/segments/Header";
import Footer from "components/segments/Footer";
import { EThemes } from "components/ThemeSwitcher/types";
import { useTheme } from "components/ThemeSwitcher";
import BitOkIcon from "components/Icons/BitOkIcon";

import { isAuthorizedSelector } from "store/auth/selectors";

import { isHere } from "utils/url";
import { EStorageKeys } from "utils/storageHeplers";

import BitnalogIcon from "../Icons/BitnalogIcon";

import { ILayout } from "./types";
import { LayoutAppNameContext } from "./hooks";

const Layout: React.FC<ILayout> = ({ children }) => {
  const { ready } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isAuthorized = useSelector(isAuthorizedSelector);

  const location = useLocation();

  useEffect(() => {
    const storedTheme = (localStorage.getItem(EStorageKeys.THEME)) as EThemes;
    if (storedTheme === EThemes.dark && isFunction(setTheme)) setTheme(EThemes.dark);
    else if (isFunction(setTheme)) setTheme(EThemes.light);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const getHighChildrenComponent = (value: TChildren) => {
    if (location.pathname.includes(paths.ASSETS)) {
      return <AssetsPageWrapper>{value}</AssetsPageWrapper>;
    }

    if (location.pathname.includes(paths.SETTINGS)) {
      if (location.pathname.includes(paths.SETTINGS_SERVICES) && process.env.REACT_APP_SERVICES_DISABLED === "true") {
        return value;
      }

      return <SettingsPageWrapper>{value}</SettingsPageWrapper>;
    }
    return value;
  };

  const lightGreyMobile = matchPath(location.pathname, paths.HOME)?.isExact;

  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    return <></>;
  }

  const getAppNameValue = () => {
    if (process.env.REACT_APP_NAME === EAppNames.bitOk) {
      return { name: "BitOK", logo: <BitOkIcon/> };
    }
    return { name: "Bitnalog", logo: <BitnalogIcon/> };
  };

  return (
    <div className={`layout-page ${theme === "dark" ? "dark-page" : "light-page"}`}>
      <LayoutAppNameContext.Provider value={getAppNameValue()}>
        <GoogleAnalytics>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            {isAuthorized ? (
              <>
                <Header/>
                <main
                  className={cn("main", {
                    iWithoutMainPadding:
                    isHere(paths.TRANSACTIONS)
                    || location.pathname.includes(paths.REPORT_CONSTRUCTOR)
                    || location.pathname.includes(paths.DOCUMENTS_CREATE_TRANSACTION_EXPORT)
                    || location.pathname.includes(paths.DOCUMENTS_CREATE_SOURCES_EXPORT)
                    // temporary code
                    ,
                    "light-grey": lightGreyMobile,
                    settings: location.pathname.includes(paths.SETTINGS),
                    "dashboard-page": location.pathname === paths.HOME,
                    "documents-page": location.pathname === paths.DOCUMENTS,
                    "upload-operations-page": location.pathname === paths.DOCUMENTS_CREATE_TRANSACTION_EXPORT
                    || location.pathname === paths.DOCUMENTS_CREATE_SOURCES_EXPORT ,
                  })}
                >
                  {getHighChildrenComponent(children)}
                </main>
                <Footer/>
              </>
            ) : (
              ready ? <div>{children}</div> : <div/>
            )}
          </GoogleOAuthProvider>
        </GoogleAnalytics>
      </LayoutAppNameContext.Provider>
    </div>
  );
};

export default Layout;
