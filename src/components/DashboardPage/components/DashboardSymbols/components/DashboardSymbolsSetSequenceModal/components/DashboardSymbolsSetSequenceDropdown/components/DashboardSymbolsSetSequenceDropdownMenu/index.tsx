import { FC } from 'react';
import cn from "classnames";
import { Menu, Skeleton } from "antd";
import { useSelector } from "react-redux";

import { assetsDashboardAvailableSymbolsStateSelector } from "../../../../../../../../../../store/assets/selectors";
import { TAssetsDashboardAvailableSymbol } from "../../../../../../../../../../store/assets/types";

import { useDashboardSymbols } from "../../../DashboardSymbolsSetSequenceForm/hooks";

import { DashboardSymbolsSetSequenceDropdownOption } from "../../types";

export type DashboardSymbolsSetSequenceDropdownMenuProps = {
  options: DashboardSymbolsSetSequenceDropdownOption[],
  symbol: TAssetsDashboardAvailableSymbol,
  index: number,
  setVisible: (val: boolean) => void,
  setSearch: (val: string) => void,
  selectSymbol: (val: string) => string,
}
const DashboardSymbolsSetSequenceDropdownMenu: FC<DashboardSymbolsSetSequenceDropdownMenuProps> = ({
  options, symbol, index, setVisible, setSearch, selectSymbol
}) => {
  const { data: availableSymbols, fetching: loading } =
    useSelector(assetsDashboardAvailableSymbolsStateSelector(symbol.id)) || {};
  const { setSymbols } = useDashboardSymbols();
  
  const onSelect = (v: string) => {
    if (setSymbols) {
      setSymbols( prev => {
        if (prev) {
          const _prev = prev && [...prev];
          _prev[index] =
            (availableSymbols ? availableSymbols.find(sym => sym.id === v) : symbol) as TAssetsDashboardAvailableSymbol;
          return _prev;
        }
        return prev;
      });
    }
    setVisible(false);
    setSearch(selectSymbol(v));
  };
  
  return <Menu className={cn("dashboard-symbols-set-sequence-item-dropdown-menu", { overflow: options.length > 5 })}>
    { loading
      ? [...Array(3)].map(idx => (
        <div key={idx} className="dashboard-symbols-set-sequence-item-dropdown-menu-item-skeleton">
          <Skeleton.Button active={true} size={"default"} />
        </div>
      ))
      : options.map(item => (
        <Menu.Item
          key={item.value}
          onClick={() => onSelect(item.value)}
        >
          <div className="dashboard-symbols-set-sequence-item-dropdown-menu-item-wrapper">
            {item.icon}
            <div className="dashboard-symbols-set-sequence-item-dropdown-menu-item-wrapper-label">{item.label}</div>
          </div>
        </Menu.Item>
      ))}
  </Menu>;
};

export default DashboardSymbolsSetSequenceDropdownMenu;