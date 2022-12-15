import { FC } from "react";
import cn from "classnames";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

import { TransactionShowMoreProps } from "./types";


const TransactionShowMore: FC<TransactionShowMoreProps> = ({ onClick, loading }) => {
  const { t } = useTranslation();
  return (
    <div className="transactions-list__show-more__wrapper">
      {loading
        ? (
          <Skeleton.Button
            active={true}
            size={"default"}
            className={cn("transactions-list__show-more-skeleton")}
          />
        )
        : (
          <Button
            className={cn("transactions-list__show-more", { skeleton: true })}
            onClick={onClick}
            disabled={false}
            title={t("action.showMore")}
          />
        )
      }
    </div>
  );};

export default TransactionShowMore;