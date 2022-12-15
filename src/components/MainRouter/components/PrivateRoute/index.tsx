import { FC }  from "react";
import { Route, Redirect, RouteComponentProps, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "config/paths";
import { authRoutes } from "config/routes";

import useQuery from "hooks/useQuery";

import { isAuthorizedSelector } from "store/auth/selectors";

import { EStorageKeys } from "utils/storageHeplers";
import { getOnlyUtm } from "utils/getOnlyUtm";

import { IRouteProps } from "../../types";

const PrivateRoute: FC<IRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector(isAuthorizedSelector);
  const token = localStorage.getItem(EStorageKeys.TOKEN);
  const location = useLocation();
  const query = useQuery();

  const handleRedirect = () => {
    if (location.pathname && authRoutes.find(route => route.path && location.pathname.includes(route.path))) {
      return null;
    }
    return <Redirect to={paths.SIGN_IN + getOnlyUtm(query)} />;
  };

  const render = (routeProps: RouteComponentProps) =>
    isAuthorized ? <Component {...routeProps} /> : !token ? handleRedirect() : null;

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
