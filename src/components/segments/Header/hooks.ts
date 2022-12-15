import { matchPath, useLocation } from "react-router-dom";

import { paths } from "config/paths";

type TUseActiveNavLink = () => (link: string) => boolean

export const useActiveNavLink: TUseActiveNavLink = () => {
  const location = useLocation();

  return (link: string) => {
    if (link !== paths.HOME) {
      return !!matchPath(location.pathname, {
        path: link,
      });
    }
    return link === location.pathname;
  };
};
