import { FC } from "react";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";

import { ESyncStatus } from "config/types";

import SyncLoader from "components/SyncLoader";

import { TMyAssetsData } from "store/assets/types";

const AssetCard: FC<{ item: TMyAssetsData, onClickBox: () => void }> = ({ item, onClickBox }) => {
  const { t } = useTranslation();

  return (
    <div key={item.id} className="create-document__step-one__check-item-wrapper">
      <div onClick={onClickBox} className="create-document__step-one__check">
        {item.status === ESyncStatus.synchronizing ?
          <div className="sync-icon-wrapper"><SyncLoader isSpin={true} /></div>:
          <img src={item.icon} className="check-icon-wrapper" />}
        <div className="check-content-wrapper">
          <div className="check-title">{item.name}</div>
          {item.status === ESyncStatus.synchronizing
            ? <div className="check-text check-text--synchronizing">{t("accountSync.synchronization")}</div>
            : item.status === ESyncStatus.error
              ? <div className="check-text check-text--error">{t("accountSync.synchronizationError")}</div>
              : <div className="check-text">{t("operations.count", { count: item.transaction_count || 0 })}</div>
          }
        </div>
        {!!item.synchronized_at &&
        <div className="check-checkbox-wrapper">
          <Checkbox value={item.id} />
        </div>
        }
      </div>
    </div>
  );
};

export default AssetCard;
