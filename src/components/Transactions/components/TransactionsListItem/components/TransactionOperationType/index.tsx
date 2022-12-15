import { FC, Fragment } from "react";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { colors, maxMobileMediaWidth } from "config/constants";

import ArrowIcon from "components/Icons/TransactionArrowIcon";
import { ETransactionOperationType, OutputTitle } from "components/Transactions/types";

import { TTransactionResult } from "store/transactions/types";

import { useTransactionsListItem } from "../../hooks";

import TransactionOperationTypeItem from "../TransactionOperationTypeItem";

import { TransactionOperationTypeProps } from "./types";

const TransactionOperationType: FC<TransactionOperationTypeProps> = ({
  openEditModal,
  symbol,
  isResult,
  classify,
  showBtns
}) => {
  const { transaction } = useTransactionsListItem();
  const { t } = useTranslation();
  const {
    src_asset,
    dst_asset,
    dst_extra_fio,
    position_symbol_icon,
    position_quote_asset,
    needs_details,
    formedInfo
  } = transaction as TTransactionResult;

  const {
    outputSubTitle,
    inputSubTitle,
    blocksType,
    error,
    isMarginTrading,
    inputSource,
    outputSource,
    inputName,
    outputName,
    isLoss,
    longInputName,
    longOutputName
  } = formedInfo;

  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const handleShowBtns = (bType: string | null) => bType === ETransactionOperationType.external && showBtns;
  return (
    <Fragment>
      <div 
        className={cn("transactions-item-center__operation", {
          externalOperation: blocksType.leftBlock === ETransactionOperationType.external,
          needInfoOperation: blocksType.leftBlock === ETransactionOperationType.external
          && (needs_details || classify || error),
          marginTrading: isMarginTrading,
          clickable: handleShowBtns(blocksType.leftBlock) || classify
        })}
        onClick={() => (handleShowBtns(blocksType.leftBlock) || classify) && openEditModal()}
      >
        <TransactionOperationTypeItem
          blocksType={"leftBlock"}
          editOpen={() => openEditModal()}
          isExternalType={blocksType.leftBlock === ETransactionOperationType.external}
          showBtns={handleShowBtns(blocksType.leftBlock)}
          title={inputSource}
          asset={isMarginTrading ? position_symbol_icon : src_asset}
          name={inputName}
          cost={inputSubTitle || ""}
          symbol={symbol}
          classify={classify}
          longName={longInputName}
        />
      </div>

      <div className="transactions-item-center__arrow">
        <ArrowIcon fill={colors.main} />
      </div>

      <div
        className={cn("transactions-item-center__operation", {
          externalOperation: blocksType.rightBlock === ETransactionOperationType.external,
          needInfoOperation: blocksType.rightBlock === ETransactionOperationType.external
          && needs_details && !isResult,
          isErrorCost: outputSubTitle === OutputTitle.unknown && dst_extra_fio === null,
          marginTrading: isMarginTrading && isMobile,
          clickable: handleShowBtns(blocksType.rightBlock) || classify
        })}
        onClick={() => (handleShowBtns(blocksType.rightBlock) || classify) && openEditModal()}
      >
        <TransactionOperationTypeItem
          blocksType={"rightBlock"}
          editOpen={() => openEditModal()}
          isExternalType={blocksType.rightBlock === ETransactionOperationType.external}
          showBtns={handleShowBtns(blocksType.rightBlock)}
          title={outputSource}
          asset={isMarginTrading ? position_quote_asset : dst_asset}
          name={outputName}
          isLoss={isLoss}
          longName={longOutputName}
          cost={outputSubTitle ? t(outputSubTitle) : ""}
        />
      </div>
    </Fragment>
  );
};

export default TransactionOperationType;
