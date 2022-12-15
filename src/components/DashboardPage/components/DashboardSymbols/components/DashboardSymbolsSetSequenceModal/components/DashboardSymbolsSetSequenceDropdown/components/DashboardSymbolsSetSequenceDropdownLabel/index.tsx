import { FC } from 'react';

import ArrowIcon from "components/Icons/ArrowIcon";

import { DashboardSymbolsSetSequenceDropdownLabelProps } from "./types";

const DashboardSymbolsSetSequenceDropdownLabel: FC<DashboardSymbolsSetSequenceDropdownLabelProps> = ({ symbol }) => (
  <>
    <div className="label-title">
      {`${symbol.icon}/${symbol.name.replace(symbol.icon, "")}`}
    </div>
    <div className="label-detail">
      <span className="type">{symbol.type}</span>
      <span className="source">{symbol.source}</span>
      <ArrowIcon className="arrow"/>
    </div>
  </>
);

export default DashboardSymbolsSetSequenceDropdownLabel;