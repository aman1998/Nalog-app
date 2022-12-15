import { FC } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";

import { getAssetsHintTextVisibleSelector } from "store/reports/selectors";

import PromptMobile from "./components/BNPromptMobile";
import PromptDesktop from "./components/BNPromptDesktop";
import { BNPromptProps } from "./types";

const BNPrompt: FC<BNPromptProps> = ({ text, defaultPromptText, onClose, onOpen, className }) => {
  const visibleTextHint = useSelector(getAssetsHintTextVisibleSelector);

  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  if (isMobile) {
    return <PromptMobile
      className={className}
      text={text}
      defaultPromptText={defaultPromptText}
      onClose={onClose} onOpen={onOpen}
    />;
  }

  if (!visibleTextHint) {
    return null;
  }

  return <PromptDesktop
    className={className}
    text={text}
    defaultPromptText={defaultPromptText}
    onClose={onClose}
  />;
};

export default BNPrompt;
