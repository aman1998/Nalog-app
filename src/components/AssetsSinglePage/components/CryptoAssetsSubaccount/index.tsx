import { FC } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";

import CryptoItemsList from "../CryptoItemsList";

import { CryptoAssetsSubaccountProps } from "./types";
import { formTitle } from "./utils";


const CryptoAssetsSubaccount: FC<CryptoAssetsSubaccountProps> = ({ subaccount, currency }) =>{
  const { t } = useTranslation();
  const showLink = subaccount?.id && subaccount?.transactions !== null;

  const title = formTitle(subaccount.sub_type, subaccount.name);

  return (
    <div className="crypto-assets-list">
      <div className="crypto-assets-list_title">
        {/*{subaccount.name}*/}
        {title}
        {showLink && <NavLink
          to={`${paths.TRANSACTIONS}?account=${subaccount?.id}`}
          className={cn("crypto-assets-list_transactions", { underline: subaccount?.transactions })}
        >
          {t('naming.transactionCount', { count: subaccount?.transactions || 0 })}
        </NavLink>}
      </div>
      {subaccount.balances && !!subaccount.balances.length && (
        <div className="crypto-assets-list_items">
          <CryptoItemsList balances={subaccount.balances} currency={currency} showMoreBtn={true}/>
        </div>
      )}
    </div>
  );};

export default CryptoAssetsSubaccount;