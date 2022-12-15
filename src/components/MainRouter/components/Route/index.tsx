import { Route as BaseRoute } from "react-router-dom";
import { FC } from "react";

import { IRouteProps } from "../../types";

const Route: FC<IRouteProps> = ({ path, exact, component: Component }) => (
  <BaseRoute path={path} exact={exact} render={routeComponentProps => <Component {...routeComponentProps} />} />
);

export default Route;
