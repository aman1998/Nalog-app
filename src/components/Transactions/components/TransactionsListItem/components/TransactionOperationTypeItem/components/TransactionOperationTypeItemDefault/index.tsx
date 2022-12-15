import cn from "classnames";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import MediaQuery from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";

import CryptoIcon from "components/CryptoIcon";
import Popover from "components/Popover";
import EditIcon from "components/Icons/EditIcon";
import PaperIcon from "components/Icons/PaperIcon";
import VectorBoldIcon from "components/Icons/VectorBoldIcon";

import { TransactionOperationTypeItemProps } from "../../types";

const TransactionOperationTypeItemDefault: FC<TransactionOperationTypeItemProps> = ({
  title,
  asset,
  cost,
  name,
  showBtns = false,
  isExternalType,
  editOpen,
  btnIconColors,
  isLoss = false,
  longName,
  classify = false,
  errorMsg
}) => {
  const { t } = useTranslation();
  const handleOpenEdit = () => {
    editOpen();
  };
  
  return (
    <>
      <div className="transactions-item-center__operation__header">
        <h3 className="transactions-item-center__operation__title">{title}</h3>
        {
          showBtns &&
          <div className="transactions-item-center__operation__btns">
            <div className={cn("transactions-item-center__operation__btns-item", {
              transactionEditBtnBlue: btnIconColors?.editIcon === "blue",
              transactionEditBtnRed: btnIconColors?.editIcon === "red",
            })} onClick={handleOpenEdit}>
              <EditIcon/>
            </div>
            <div className={cn("transactions-item-center__operation__btns-item", {
              transactionFileBtnGray: btnIconColors?.fileIcon === "gray",
              transactionFileBtnRed: btnIconColors?.fileIcon === "red",
              transactionFileBtnGreen: btnIconColors?.fileIcon === "green",
            })} onClick={handleOpenEdit}>
              <PaperIcon/>
            </div>
          </div>
        }
      </div>
      <div className={cn("transactions-item-center__operation__content", { fiat: !title })}>
        <MediaQuery minWidth={maxMobileMediaWidth + 1}>
          <CryptoIcon
            isExternalType={isExternalType}
            className="transactions-item-center__operation__logo"
            asset={asset}
          />
          <div className={cn("transactions-item-center__operation__content__left", { long: longName })}>
            <div className={cn("transactions-item-center__operation__name", { fiat: isExternalType, isLoss })}>
              {name}
            </div>
            <div className="transactions-item-center__operation__msg" onClick={e => e.stopPropagation()}>
              {cost && <Popover content={cost} trigger="click">
                <div className={cn({ fiat: !title, classify })}>
                  {cost}
                </div>
              </Popover>}
              {!cost && errorMsg && <Popover content={t(errorMsg)} trigger="click">
                <div className={cn("error")}>
                  {t(errorMsg)}
                </div>
              </Popover>}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={maxMobileMediaWidth}>
          <div className="transactions-item-center__operation__content__left">
            <CryptoIcon
              isExternalType={isExternalType}
              className="transactions-item-center__operation__logo"
              asset={asset}
            />
            <div className={cn("transactions-item-center__operation__name", { fiat: isExternalType, isLoss })}>
              {name}
            </div>
          </div>
          <div className="transactions-item-center__operation__msg" onClick={e => e.stopPropagation()}>
            {cost && <Popover content={cost} trigger="click">
              <div className={cn({ fiat: !title, classify })}>
                {cost}
              </div>
            </Popover>}
            {!cost && errorMsg && <Popover content={t(errorMsg)} trigger="click">
              <div className={cn("error")}>
                {t(errorMsg)}
              </div>
            </Popover>}
          </div>
        </MediaQuery>
      </div>
      {classify && (
        <div className="transactions-item-center__margin-trading__classify" 
          onClick={handleOpenEdit}>
          <span>{t("action.classify")}</span>
          <VectorBoldIcon className="vector"/>
        </div>)
      }
    </>
  );
};

export default TransactionOperationTypeItemDefault;