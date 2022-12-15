import { matchPath, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useMemo } from "react";

import { paths } from "config/paths";
import { maxMobileMediaWidth } from "config/constants";
import { privateRoutes } from "config/routes";

import { EScrollDirection } from "hooks/types";
import { useScrollDirection } from "hooks/useScrollDirection";

import HeaderContent from "./components/HeaderContent";

const Header = (): JSX.Element => {
  const [top, scrollDir] = useScrollDirection();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)`, });
  const location = useLocation();

  const headerIsFixed = useMemo(() => {
    const headerFixPages: string[] =
      [
        paths.TRANSACTIONS,
        paths.SINGLE_REPORT,
        paths.REPORT_CONSTRUCTOR,
        paths.DOCUMENTS_CREATE_TRANSACTION_EXPORT,
        paths.DOCUMENTS_TRANSACTION_EXPORT,
        paths.DOCUMENTS_CREATE_SOURCES_EXPORT,
        paths.DOCUMENTS_SOURCES_EXPORT,
      ];
    const currentRoutePath = privateRoutes.find(
      route => matchPath(location.pathname, route)?.isExact
    )?.path || '';

    return headerFixPages.includes(currentRoutePath);
  }, [location.pathname]);

  const isReportConstructorPage = useMemo(() => {
    location.pathname.includes(paths.REPORT_CONSTRUCTOR);
  }, [location.pathname]);

  return (
    <HeaderContent headerClass={{
      headerBoxShadowOff: (headerIsFixed || isReportConstructorPage) && !isMobile,
      headerScrollTop: scrollDir === EScrollDirection.down && top > 80 && headerIsFixed && !isMobile,
      headerFixed: scrollDir === EScrollDirection.up && headerIsFixed && !isMobile,
      headerStatic: !headerIsFixed,
    }} />
  );
};

export default Header;
