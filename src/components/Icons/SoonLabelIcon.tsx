import { FC } from "react";

import { IIconsProps } from "config/types";

import i18n from "../../i18n";
import { ELanguages } from "../../i18n/constants";

import SoonLabelRuIcon from "./SoonLabelRuIcon";
import SoonLabelEnIcon from "./SoonLabelEnIcon";

{
  /* eslint-disable max-len */
}
const SoonLabelIcon: FC<IIconsProps> = ({ className }) => {
  if (i18n.language === ELanguages.ruRU) {
    return <SoonLabelRuIcon className={className} />;
  }
  return <SoonLabelEnIcon className={className} />;
};

export default SoonLabelIcon;
