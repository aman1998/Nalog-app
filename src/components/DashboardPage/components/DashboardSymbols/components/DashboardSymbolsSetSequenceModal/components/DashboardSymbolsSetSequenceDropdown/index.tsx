import cn from "classnames";
import debounce from "lodash/debounce";
import { Dropdown, Empty, Menu, Skeleton } from "antd";
import { ChangeEvent, FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import update from "immutability-helper";

import CryptoIcon from "components/CryptoIcon";

import useOnClickOutside from "hooks/useOnClickOutside";

import {
  assetsDashboardAvailableSymbolsStateSelector,
} from "store/assets/selectors";
import {
  AssetsDashboardAvailableSymbolOptionsParams, TAssetsDashboardAvailableSymbol,
} from "store/assets/types";
import { getAssetsDashboardAvailableSymbolsRequest } from "store/assets/reducers";

import { useDashboardSymbols } from "../DashboardSymbolsSetSequenceForm/hooks";

import DashboardSymbolsSetSequenceDropdownLabel from "./components/DashboardSymbolsSetSequenceDropdownLabel";
import { DashboardSymbolsSetSequenceDropdownOption, DashboardSymbolsSetSequenceDropdownProps } from "./types";

const DashboardSymbolsSetSequenceDropdown: FC<DashboardSymbolsSetSequenceDropdownProps> = memo(({ symbol, index }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setSymbols, symbols } = useDashboardSymbols();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);
  const { data: availableSymbols, fetching: loading } =
    useSelector(assetsDashboardAvailableSymbolsStateSelector(symbol.id)) || {};
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [params, setParams] = useState<AssetsDashboardAvailableSymbolOptionsParams>({});
  const [visible, setVisible] = useState(false);

  const selectSymbol = (symbolId: string): string => {
    const sym = availableSymbols?.find(v => v.id === symbolId) || symbol;
    return sym ? `${sym.name}, ${sym.type}, ${sym.source}` : '';
  };

  const options: DashboardSymbolsSetSequenceDropdownOption[] = useMemo(() =>
    availableSymbols ? availableSymbols
      // get symbols not exists in symbols
      .filter(sym => !symbols?.map(item => item.id).filter(item => item !== symbol.id).includes(sym.id))
      .map(sym => {
        const active = sym.id === symbol.id;
        return {
          icon: <CryptoIcon asset={sym.icon}/>,
          label: <DashboardSymbolsSetSequenceDropdownLabel symbol={sym} />,
          value: sym.id,
          active
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }) : [], [search, availableSymbols, symbols]
  );

  const activeOption = options.find(item => item.active) ||
    {
      icon: <CryptoIcon asset={symbol?.icon}/>,
      label: <DashboardSymbolsSetSequenceDropdownLabel symbol={symbol} />,
      value: symbol?.id,
    };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearch(e.target.value);
      setParams(prev => ({ ...prev, search: e.target.value }));
    }
  };

  const onSelect = (v: string) => {
    if (setSymbols) {
      setSymbols( prevSymbols => {
        if (!prevSymbols) {
          return prevSymbols;
        }
        const selectedSymbol =
          (availableSymbols ? availableSymbols.find(sym => sym.id === v) : symbol) as TAssetsDashboardAvailableSymbol;
        return update(prevSymbols, { [index]: { $set: selectedSymbol } });
      });
    }
    setVisible(false);
    setSearch(selectSymbol(v));
  };

  const onVisibleChange = (v: boolean) => {
    if (searchFocused) {
      setVisible(true);
    } else {
      setVisible(v);
    }

    if (search) {
      setSearch(selectSymbol(symbol.id));
    }

    setTimeout(() => (
      v && searchRef.current && searchRef.current.focus()
    ), 0);
  };

  const onSearchFocus = () => {
    setSearchFocused(true);
    if (searchRef.current) {
      searchRef.current.value = selectSymbol(symbol.id);
    }
  };

  useOnClickOutside({ 
    ref: menuRef, handler: () => {
      setSearchFocused(false);
      setVisible(false); 
    }, 
    clickedRef: wrapperRef
  });

  useEffect(() => {
    dispatch(getAssetsDashboardAvailableSymbolsRequest({ id: symbol.id, params }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const menu = useMemo(() => (
    <Menu  className={cn("dashboard-symbols-set-sequence-item-dropdown-menu", {
      overflow: options.length > 5, empty: options.length === 0 })}
    >
      <div ref={menuRef}>
        { loading
          ? [...Array(3)].map(idx => (
            <div key={idx} className="dashboard-symbols-set-sequence-item-dropdown-menu-item-skeleton">
              <Skeleton.Button active={true} size={"default"} />
            </div>
          ))
          : options.length > 0 ? options.map(item => (
            <Menu.Item
              key={item.value}
              onClick={() => onSelect(item.value)}
            >
              <div className="dashboard-symbols-set-sequence-item-dropdown-menu-item-wrapper">
                {item.icon}
                <div className="dashboard-symbols-set-sequence-item-dropdown-menu-item-wrapper-label">{item.label}</div>
              </div>
            </Menu.Item>
          )
          ) : <div className="dashboard-symbols-set-sequence-item-dropdown-menu-empty">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>{t("naming.noData")}</span>} />
          </div>
        }
      </div>
    </Menu>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [options]);

  return <Dropdown
    overlay={menu}
    trigger={["click"]}
    className="dashboard-symbols-set-sequence-item-dropdown"
    visible={visible}
    placement="bottomLeft"
    onVisibleChange={isVisible => onVisibleChange(isVisible)}
    disabled={loading}
  >
    <div ref={wrapperRef}>
      <div className={cn("dashboard-symbols-set-sequence-item-dropdown-wrapper", { click: visible })}>
        {activeOption?.icon}<div className="dashboard-symbols-set-sequence-item-dropdown-wrapper-label">
          {activeOption?.label}</div>
      </div>
      <input
        ref={searchRef}
        type="text"
        className={cn("dashboard-symbols-set-sequence-item-dropdown-input", { focus: visible })}
        onChange={debounce(onSearch, 200)}
        onFocus={onSearchFocus}
      />
    </div>
  </Dropdown>;
});

export default DashboardSymbolsSetSequenceDropdown;