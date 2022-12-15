import { ChangeEvent, FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Skeleton } from "antd";
import { useField } from "formik";
import debounce from "lodash/debounce";
import cn from "classnames";

import CryptoIcon from "components/CryptoIcon";
import QuestionMarkIcon from "components/Icons/QuestionMarkIcon";

import { getAssetsCurrencyRequest } from "store/assets/reducers";
import { assetsCurrencyData, assetsCurrencyFetching } from "store/assets/selectors";
import { TAssetCurrencyOptions } from "store/assets/types";

import { TransactionItemCurrencyDropdownOptions, TransactionItemCurrencyDropdownProps } from "./types";

const TransactionItemCurrencyDropdown: FC<TransactionItemCurrencyDropdownProps> =
  memo(({ name, disabled, fiat, defaultValue, defaultOptions }) => {
    const dispatch = useDispatch();
    const searchRef = useRef<HTMLInputElement>(null);
    const list = useSelector(assetsCurrencyData(name));
    const loading = useSelector(assetsCurrencyFetching(name));
    const [search, setSearch] = useState('');
    const [params, setParams] = useState<TAssetCurrencyOptions>({ size: 20, fiat, default: defaultValue || '' });
    const [visible, setVisisble] = useState(false);
    const [, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { value, initialValue } = meta;

    const options: TransactionItemCurrencyDropdownOptions[] = useMemo(() =>
      list.filter(item => item.code.toUpperCase().includes(search.toUpperCase()))
        .map((item, index) => {
          let active = item.code === value;
          if (index === 0 && !value) {
            active = true;
          }
          return {
            icon: <CryptoIcon asset={item.code}/>,
            value: item.code,
            active
          };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [search, list, value]);

    const activeOption = options.find(item => item.active);

    const onSelect = (v: string) => {
      setValue(v);
      setVisisble(false);
      setSearch('');
    };

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setParams(prev => ({ ...prev, code: e.target.value }));
    };

    const onVisibleChange = (v: boolean) => {
      setVisisble(v);

      const filteredOption = options.find(option => option.value === search.toUpperCase());
      if (filteredOption) {
        onSelect(filteredOption.value);
      } else if (!search) {
        setValue(initialValue);
      } else {
        setValue('');
      }

      setTimeout(() => (
        v && searchRef.current && searchRef.current.focus()
      ), 0);
    };

    useEffect(() => {
      dispatch(getAssetsCurrencyRequest({ name, params }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params]);

    const menu = (() => {
      const $options = defaultOptions ? defaultOptions : options;

      return <Menu className={cn("transactions-edit__currency-menu", { overflow: $options.length > 2 })}>
        { loading
          ? [...Array(3)].map(idx => (
            <div key={idx} className="transactions-edit__currency-item-skeleton">
              <Skeleton.Button key={idx} active={true} size={"default"} />
            </div>
          ))
          : $options.map(item => (
            <Menu.Item
              key={item.value}
              onClick={() => onSelect(item.value)}
              disabled={disabled}
            >
              <div className="transactions-edit__currency-item-wrapper">
                {item.icon}
                <p>{item.value}</p>
              </div>
            </Menu.Item>
          ))}
      </Menu>;
    })();

    return <Dropdown
      overlay={(!!defaultOptions || !!options.length || loading) ? menu : <></>}
      trigger={["click"]}
      className="transactions-edit__currency"
      visible={visible}
      placement="bottomLeft"
      onVisibleChange={isVisible => onVisibleChange(isVisible)}
      disabled={disabled || loading}
    >
      <div>
        <div className={cn("transactions-edit__currency-item-wrapper", { "click": visible })}>
          {search
            ? <> <QuestionMarkIcon/><p>{search.toUpperCase()}</p></>
            : <> {activeOption?.icon}<p>{activeOption?.value}</p></>
          }
        </div>
        <input
          ref={searchRef}
          type="text"
          className={cn("transactions-edit__currency-item-input", { focus: visible })}
          onChange={debounce(onSearch, 200)}
        />
      </div>
    </Dropdown>;
  });

export default TransactionItemCurrencyDropdown;