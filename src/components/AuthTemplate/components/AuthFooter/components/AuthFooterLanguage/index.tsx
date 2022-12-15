import { FC, useMemo } from "react";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";

import { LANGUAGE_OPTIONS } from "config/constants";

import ArrowIcon from "components/Icons/ArrowIcon";

import { onChangeLanguageHandler } from "../../../../../../i18n/utils";
import { ELanguages } from "../../../../../../i18n/constants";

const AuthFooterLanguage: FC = () => {
  const { i18n } = useTranslation();
  const activeLang = LANGUAGE_OPTIONS[i18n.language as ELanguages];

  const menu = useMemo(() => (
    <Menu>
      {!process.env.REACT_APP_LANGUAGE && Object.keys(LANGUAGE_OPTIONS).map(lng => (
        <Menu.Item
          key={lng}
          onClick={() => {
            onChangeLanguageHandler(lng);
          }}
        >
          {LANGUAGE_OPTIONS[lng as ELanguages].nativeName}
        </Menu.Item>
      ))}
    </Menu>
  ), []);
  
  return (
    <div className="sign-footer__lang">
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="bottomLeft"
        className="sign-footer__lang__dropdown__container"
        overlayClassName="sign-footer__lang__dropdown"
      >
        <div><activeLang.icon/> {activeLang.nativeName} <ArrowIcon className="arrow"/></div>
      </Dropdown>
    </div>
  );
};

export default AuthFooterLanguage;