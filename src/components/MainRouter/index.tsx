import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import capitalize from "lodash/capitalize";

import { authRoutes, privateRoutes } from "config/routes";
import { EAppNames } from "config/types";

import Layout from "components/Layout";
import ThemeSwitcher from "components/ThemeSwitcher";
import YandexMetricaInitializer from "components/YandexMetricaInitializer";
import ScrollToTop from "components/ScrollToTop";

import PageNoteFound from "pages/pageNotFound";

import { getUserInfoRequest } from "store/user/reducers";
import { getHintTextRequest } from "store/reports/reducers";
import { isAuthorizedSelector } from "store/auth/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";
import { getUserInfoDataSelector } from "store/user/selectors";

import { initAmplitude } from "utils/amplitudeAnalytic";
import { EStorageKeys } from "utils/storageHeplers";
import { setDateTimeLocale } from "utils/dateHelpers";

import { changeLanguageAuto, changeLanguageSelected } from "../../i18n/utils";

import PrivateRoute from "./components/PrivateRoute";
import Route from "./components/Route";

const MainRouter = (): JSX.Element => {
  const { t, i18n, ready } = useTranslation();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfoDataSelector);
  
  setDateTimeLocale();
  
  useEffect(() => {
    if (ready) {
      const appName = process.env.REACT_APP_NAME ? (process.env.REACT_APP_NAME as EAppNames) : EAppNames.bitOk;
      document.title = t('application.title', { app_name: capitalize(String(appName)) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  
  useEffect(() => {
    const token = localStorage.getItem(EStorageKeys.TOKEN);
    if (!!token) {
      dispatch(getUserInfoRequest());
      dispatch(getHintTextRequest(process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (userInfo && userInfo?.language !== i18n.language) {
      if (userInfo?.language === "auto") {
        changeLanguageAuto();
      } else if (userInfo?.language) {
        changeLanguageSelected(userInfo?.language);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    initAmplitude();
  }, []);

  useEffect(() => {
    if (isAuthorized && userInfo?.id) {
      dispatch(analyticEvent(EEventType.AUH_SESSION_NEW));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, userInfo]);

  return (
    <BrowserRouter>
      <YandexMetricaInitializer/>
      <ThemeSwitcher>
        <ScrollToTop>
          <Layout>
            <Suspense fallback={<div />}>
              <Switch>
                {authRoutes.filter(route => route.active).map(route => (
                  <Route path={route.path} component={route.component} key={route.path} exact={true} />
                ))}
                {privateRoutes.filter(route => route.active).map(route => (
                  <PrivateRoute path={route.path} key={route.path} component={route.component} exact={true} />
                ))}
                <PrivateRoute component={PageNoteFound} exact={true} />
              </Switch>
            </Suspense>
          </Layout>
        </ScrollToTop>
      </ThemeSwitcher>
     
    </BrowserRouter>
  );
};

export default MainRouter;
