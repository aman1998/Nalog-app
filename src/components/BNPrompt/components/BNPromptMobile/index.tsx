import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";

import PromptIcon from "components/Icons/PromptIcon";
import Button from "components/Buttons/Button";

import { getAssetsHintTextVisibleSelector } from "store/reports/selectors";
import { showHintText } from "store/reports/reducers";

import { handleSpacesInText } from "utils/handleSpacesInText";

import { BNPromptProps } from "../../types";

const BNPromptMobile: FC<BNPromptProps> = ({ text , defaultPromptText, onClose, onOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(getAssetsHintTextVisibleSelector);

  const onOpenHandler = () => {
    dispatch(showHintText(true));
    if(isFunction(onOpen)) onOpen();
  };

  const onCloseHandler = () => {
    dispatch(showHintText(false));
    if(isFunction(onClose)) onClose();
  };

  const toggle = () => {
    if (visible) {
      onCloseHandler();
    } else {
      onOpenHandler();
    }
  };

  const getHintText = () => handleSpacesInText(text || '').map((item, i) => (
    <p className="prompt__mobile-text" key={i}>{item}</p>
  ));

  return (
    <div className="prompt__mobile">
      <div
        className="prompt__mobile-icon-wrapper"
        onClick={toggle}
      >
        <PromptIcon />
      </div>
      <Drawer
        width={"100%"}
        placement="bottom"
        visible={visible}
        closable={false}
        onClose={onCloseHandler}
        className="prompt__mobile-drawer"
      >
        <div className="prompt__mobile-content">
          <h1 className="prompt__mobile-title">{t("naming.documents")}</h1>
          { text ?
            getHintText() :
            defaultPromptText
          }
          <Button
            className="prompt__mobile-btn"
            title={t("action.close")}
            onClick={onCloseHandler}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default BNPromptMobile;
