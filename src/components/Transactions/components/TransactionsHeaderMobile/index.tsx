import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import FilterLogo from "components/Icons/FilterIcon";
import PlusIcon from "components/Icons/PlusIcon";
import CloseIcon from "components/Icons/CloseIcon";

import { getMyAssetsDataSelector } from "store/assets/selectors";
import { openAddModal } from "store/transactions/reducers";

import TransactionsHeaderMobileFilter from "./components/TransactionsHeaderMobileFilter";
import { useTransactionsHeaderMobileFilter } from "./hooks";
import { checkIsDate } from "./utils";

const TransactionsHeaderMobile = (): JSX.Element => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const assets = useSelector(getMyAssetsDataSelector);
  
  const {
    getFilters,
    deleteFilters,
    handleFilter,
    checkIsFilter
  } = useTransactionsHeaderMobileFilter({ visible, setVisible });
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setVisible(prev => !prev);
  };
  const getName = (value: string) => {
    if (!!assets) {
      for (let i = 0; i <= assets.length; i++) {
        if (assets[i]?.id === value) return assets[i]?.name || t("naming.exchange");
      }
    }
    return value;
  };

  return (
    <div className="transactions-header__mobile">
      <div className="filter-logo-wrapper">
        <div className="filter-logo" onClick={toggleDrawer}><FilterLogo /></div>
        <div className="filter-logo filter-logo--plus" onClick={() => dispatch(openAddModal())}><PlusIcon /></div>
      </div>
      <div className={cn("filter-list", { isFilterActive: checkIsFilter() })}>
        {getFilters().map(item =>
          (
            item[1] !== null && item[1] !== "" && (
              <div key={item[0]} className="filter-list__item">
                <p>
                  {checkIsDate(item[0])} {getName(item[1] ?? '')}
                </p>
                <div onClick={() => deleteFilters(item[0])}>
                  <CloseIcon />
                </div>
              </div>
            )
          )
        )}
      </div>
      <TransactionsHeaderMobileFilter visible={visible} toggleDrawer={toggleDrawer} handleFilter={handleFilter}/>
    </div>
  );
};

export default TransactionsHeaderMobile;
