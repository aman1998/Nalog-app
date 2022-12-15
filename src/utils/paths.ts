import { paths } from "config/paths";

export const checkIsAuthPaths = (): boolean => {
  switch (window.location.pathname) {
  case paths.SIGN_IN: 
  case paths.SIGN_UP:
  case paths.FORGOT: return true;
  default: return false;
  }
};
