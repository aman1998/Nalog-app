import React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface IRouteProps {
  path?: string;
  exact?: boolean;
  component: React.FC<RouteComponentProps>;
}
