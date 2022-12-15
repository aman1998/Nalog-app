import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { NAVIGATION_LINKS } from "config/constants";

import CopyrightIcon from "components/Icons/CopyrightIcon";

import { useLayoutAppNameContext } from "../../Layout/hooks";

const Footer = (): JSX.Element => {
  const { name, logo } = useLayoutAppNameContext();
  const { t } = useTranslation();
  
  return (
    <footer className="footer-wrapper">
      <div className="container footer">
        <div className="footer-logo">
          {logo}
        </div>
        <nav className="footer-navigation">
          <ul>
            {NAVIGATION_LINKS.filter(link => link.active).map(link => (
              <li className="navigation-item" key={link.id}>
                <NavLink to={link.to} exact={true} className="item-link" activeClassName="item-link--active">
                  {t(link.title)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-end">
          <CopyrightIcon />
          <p>2022 {name}</p>
        </div>
      </div>
    </footer>
  );};

export default Footer;
