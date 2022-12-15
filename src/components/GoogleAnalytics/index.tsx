import { FC, Fragment, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const GoogleAnalytics: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(
    () => {
      const { gtag } = window;

      if (history.action === "PUSH" && typeof gtag === "function" && process.env.REACT_APP_GOOGLE_ANALYTIC) {
        gtag("config", process.env.REACT_APP_GOOGLE_ANALYTIC, {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
        });
      }
    },
    // eslint-disable-next-line
    []
  );

  return <Fragment>{children}</Fragment>;
};

export default GoogleAnalytics;
