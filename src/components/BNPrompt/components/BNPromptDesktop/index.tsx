import { FC } from "react";
import { useDispatch } from "react-redux";
import isFunction from "lodash/isFunction";
import cn from "classnames";

import CloseIcon from "components/Icons/CloseIcon";
import PromptIcon from "components/Icons/PromptIcon";

import { showHintText } from "store/reports/reducers";

import { handleSpacesInText } from "utils/handleSpacesInText";

import { BNPromptProps } from "../../types";


const BNPromptDesktop: FC<BNPromptProps> = ({ className, text, defaultPromptText, onClose }) => {
  const dispatch = useDispatch();

  const closeHintText = (): void => {
    dispatch(showHintText(false));
    if(isFunction(onClose)) onClose();
  };

  const getHintText = () => handleSpacesInText(text || '').map((item, i) => (
    <p className="prompt__text" key={i}>{item}</p>
  ));

  return (
    <div className={cn("prompt", className)}>
      <div className="prompt__icon-wrapper"><PromptIcon /></div>
      <div className="prompt__text-wrapper">
        { text ?
          getHintText() :
          defaultPromptText
        }
      </div>
      <div className="prompt__close-icon-wrapper" onClick={closeHintText}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default BNPromptDesktop;
