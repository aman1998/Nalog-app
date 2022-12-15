import { FC } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ru";
import cn from "classnames";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { maxMobileMediaWidth, maxTableMediaWidth, QUERIES } from "config/constants";
import { ETransactionsOperationsTypes } from "config/types";

import Button from "components/Buttons/Button";

import {
  openEditModal as openEditModalAction,
  openEditConfirm as openEditConfirmAction,
} from "store/transactions/reducers";
import { TTransactionMenuList } from "store/transactions/types";
import { EModals } from "store/modals/types";

import { formatAssetAmount } from "utils/fractions";
import { handleChangeTransactionType } from "utils/transactionUtils";

import Note from "../../../../components/Note";

import {
  ETransactionsIcon,
  ETransactionChangeTypeAction
} from "../../types";

import TransactionOperationType from "./components/TransactionOperationType";
import TransactionListItemDropdownName from "./components/TransactionListItemDropdownName";
import TransactionIcon from "./components/TransactionIcon";
import TransactionMenu from "./components/TransactionMenu";
import { TransactionsListItemProps } from "./types";
import { TransactionsListItemContext } from "./hooks";
import TransactionTags from "./components/TransactionTags";
import TransactionAdditionalInfoBtns from "./components/TransactionAdditionalInfoBtns";

const TransactionsListItem: FC<TransactionsListItemProps> = ({
  transaction,
  getCheckbox,
  isResult=false,
  isContinuation=false,
  hasContinuation=false,
  hideBorder=false,
  isDashboard=false,
}) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });

  const {
    id,
    type,
    datetime,
    fee_amount,
    fee_asset,
    src_asset,
    src_amount,
    dst_asset,
    dst_amount,
    dst_extra_fio,
    needs_details,
    checked,
    position_symbol,
    formedInfo
  } = transaction;
  const {
    transactionName,
    transactionNameAction,
    subName,
    logoType,
    showBtns,
    changeTypeList,
    incomingOperation,
    isMarginTrading,
    error
  } = formedInfo;

  const availableDelete = [
    ETransactionsOperationsTypes.manualP2pPurchase,
    ETransactionsOperationsTypes.manualP2pSale
  ].includes(type);
  const isCryptoIncome = type === ETransactionsOperationsTypes.cryptoIncome;
  const showCommission = fee_amount != null && fee_amount !== 0;
  const showSubName = !isMobile && [
    ETransactionsOperationsTypes.tradePositionOpening,
    ETransactionsOperationsTypes.tradePositionClosing
  ].includes(type);

  const handleTransactionType = (transactionType: TTransactionMenuList) => {
    if (handleChangeTransactionType(transactionType.value) === ETransactionChangeTypeAction.openModal
      && transactionType.label === transactionName) {
      dispatch(openEditModalAction({ id, title: transactionType.label, date: datetime, type }));
    }

    if (handleChangeTransactionType(transactionType.value) === ETransactionChangeTypeAction.openModal
      && transactionType.label !== transactionName) {
      dispatch(openEditModalAction(
        { id, title: transactionType.label, date: datetime, type: transactionType.value, changeType: true })
      );
    }

    if (handleChangeTransactionType(transactionType.value) === ETransactionChangeTypeAction.openConfirm
      && transactionType.label !== transactionName) {
      dispatch(openEditConfirmAction({ id, title: transactionType.label, type: transactionType.value }));
    }
  };

  const addTransactionToQuery = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.incomingOperation}`
    });
  };

  const openEditTransactionNoteModal = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.transactionEditNote}`
    });
  };

  const openEditModal = () => {
    switch (type) {
    case ETransactionsOperationsTypes.cryptoIncome:
    case ETransactionsOperationsTypes.cryptoIncomeAirdrop:
    case ETransactionsOperationsTypes.cryptoIncomeFork:
    case ETransactionsOperationsTypes.cryptoIncomeLoan:
    case ETransactionsOperationsTypes.cryptoIncomePurchase:
    case ETransactionsOperationsTypes.cryptoIncomeMyTransfer:
    case ETransactionsOperationsTypes.cryptoIncomePayment:
    case ETransactionsOperationsTypes.cryptoIncomeMining:
    case ETransactionsOperationsTypes.cryptoIncomeStakingReward:
    case ETransactionsOperationsTypes.cryptoIncomeStakingReturn:
    case ETransactionsOperationsTypes.cryptoIncomeLendingReward:
    case ETransactionsOperationsTypes.cryptoIncomeLendingReturn:
    case ETransactionsOperationsTypes.cryptoIncomeP2e:
    case ETransactionsOperationsTypes.cryptoIncomeGift:
    case ETransactionsOperationsTypes.cryptoIncomeOtherReward:
      addTransactionToQuery();
      break;
    case ETransactionsOperationsTypes.p2pSale:
      dispatch(openEditModalAction(
        { id, title: transactionName, date: datetime, type, formState: { external_amount: dst_amount } }
      ));
      break;
    case ETransactionsOperationsTypes.p2pPurchase:
      addTransactionToQuery();
      break;
    case ETransactionsOperationsTypes.manualP2pSale:
    case ETransactionsOperationsTypes.manualP2pPurchase:
      dispatch(openEditModalAction(
        {
          id, title: transactionName, date: datetime, type, formState: {
            date: datetime,
            fio: dst_extra_fio,
            srcAmount: src_amount,
            dstAsset: dst_asset,
            dstAmount: dst_amount,
            srcAsset: src_asset,
          }
        }
      ));
      break;
    default:
      dispatch(openEditModalAction({ id, title: transactionName, date: datetime, type }));
    }
  };

  const handleTransactionNameAction = () => {
    switch (type) {
    case ETransactionsOperationsTypes.cryptoIncome:
    case ETransactionsOperationsTypes.cryptoIncomeAirdrop:
    case ETransactionsOperationsTypes.cryptoIncomeFork:
    case ETransactionsOperationsTypes.cryptoIncomeLoan:
    case ETransactionsOperationsTypes.cryptoIncomePurchase:
    case ETransactionsOperationsTypes.cryptoIncomeMyTransfer:
      addTransactionToQuery();
      break;
    case ETransactionsOperationsTypes.p2pPurchase:
      addTransactionToQuery();
      break;
    }
  };

  const tagOrNoteExists = !!transaction?.tags?.length || transaction.note;


  return (
    <TransactionsListItemContext.Provider value={{ transaction }}>
      <div className={cn("transactions-item", {
        isContinuation,
        hasContinuation,
        "dashboard-transaction": isDashboard,
      })}>
        <div className={cn("transactions-item__main", {
          "tag-or-note-exists": tagOrNoteExists,
          reportTransactionsItemNeedDetails: needs_details && checked !== undefined && !isResult,
          reportTransactionsItemNeedDetailsChecked: needs_details && checked && !isResult,
          transactionsChecked: !needs_details && checked && !isResult,
          transactionsItemNeedDetails: needs_details && checked === undefined && !isResult && !hideBorder,
          transactionsItemWidthCheckbox: checked !== undefined && !isResult,
        })}>
          <div
            className="transactions-item-left"
          >
            {!isMobile && getCheckbox}
            <div
              className={cn("transactions-item-left__icon", {
                isWidthdrawalIcon: logoType === ETransactionsIcon.arrowUp && !needs_details,
                needDetailsIcon: needs_details
              })}
            >
              <TransactionIcon value={logoType} needDetails={
                (needs_details && !isResult) || !!(incomingOperation && error)}
              />
            </div>
            <div className="transactions-item-left__info">
              {showSubName && <span className="transactions-item-left__info-sub-name">{subName}</span>}
              {
                changeTypeList && changeTypeList.length ?
                  <TransactionListItemDropdownName
                    handleTransactionType={handleTransactionType}
                    transactionName={transactionName || ''}
                    showBtns={showBtns && !isResult}
                    changeTypeList={changeTypeList}
                    red={isCryptoIncome}
                  /> :
                  <p
                    className={cn("transactions-item-left__info-name", {
                      action: transactionNameAction, red: isCryptoIncome
                    })}
                    onClick={transactionNameAction ? handleTransactionNameAction : undefined}
                  >
                    {transactionName}
                  </p>
              }
              <div className="transactions-item-left__info-date-wrapper">
                <p className="transactions-item-left__info-date">
                  {moment(datetime).locale(i18n.language)
                    .format((isMobile && !isMarginTrading) ? "HH:mm" : "HH:mm, DD MMMM YYYY")}
                </p>
                {isMobile && getCheckbox}
              </div>
            </div>
          </div>
          <div className={cn("transactions-item-center", { marginTrading: isMarginTrading })}>
            <TransactionOperationType
              openEditModal={openEditModal}
              showBtns={showBtns && !isResult}
              symbol={position_symbol && position_symbol?.replace("-", "")}
              isResult={isResult}
              classify={isCryptoIncome}
            />
          </div>
          <div className="transactions-item-right">
            <div className="transactions-item-right__content">
              {needs_details && !isResult && false && <a className='additional-info' onClick={openEditModal}>
                {t("accountSync.dataRequired")}
              </a>}
              {showCommission && (
                <p className="fee">
                  {`${t("naming.fee")} ${formatAssetAmount(fee_amount, fee_asset)}`}
                </p>
              )}
              {src_asset != null && (
                <p className="profit">
                  {t("operations.profit")}: <span>{`XXX RUB`}</span>
                </p>
              )}
            </div>
          </div>
          <TransactionMenu
            transactionName={transactionName}
            availableDelete={availableDelete}
            edit={showBtns && !isResult}
            onEdit={openEditModal}
          />
          {!tagOrNoteExists && (
            <MediaQuery minWidth={maxTableMediaWidth}>
              <div className="transactions-item__add-note">
                <div className="transactions-item__add-note__btn__wrapper">
                  <Button
                    title={t("action.addNote")}
                    onClick={openEditTransactionNoteModal}
                    lettuce={true}
                    className="transactions-item__add-note__btn"
                  />
                </div>
              </div>
            </MediaQuery>
          )}
        </div>
        <MediaQuery maxWidth={maxTableMediaWidth}>
          <TransactionAdditionalInfoBtns/>
        </MediaQuery>
        {tagOrNoteExists && (
          <MediaQuery minWidth={maxTableMediaWidth}>
            <div className="transactions-item__additional-info">
              {transaction.note && <Note text={transaction.note} id={id}/>}
              {!!transaction?.tags?.length &&
              <TransactionTags id={id} tags={transaction.tags} note={transaction.note}/>}
            </div>
          </MediaQuery>
        )}
      </div>
    </TransactionsListItemContext.Provider>
  );
};

export default TransactionsListItem;
