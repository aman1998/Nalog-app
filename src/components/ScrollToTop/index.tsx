import { FC, Fragment, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

const ScrollToTop: FC = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (history.action !== "REPLACE") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <Fragment>{children}</Fragment>;
};

export default ScrollToTop;
