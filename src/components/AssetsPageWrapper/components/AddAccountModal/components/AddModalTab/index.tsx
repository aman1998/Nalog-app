import { Tabs } from "antd";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { EAssetsTypes } from "config/types";

import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

const { TabPane } = Tabs;

export type AddModalTabProps = {
  type: EAssetsTypes|null ;
  setType: (val: EAssetsTypes|null) => void;
}

const AddModalTab: FC<AddModalTabProps> = memo(({ type, setType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOnChange = ($type: EAssetsTypes|null|string) => {
    if ($type && $type !== "null") {
      setType($type as EAssetsTypes);
    } else {
      setType(null);
    }

    switch ($type) {
    case "null":
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_SHOW_ALL));
      break;
    case EAssetsTypes.EXCHANGE:
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_SHOW_EXCHANGES));
      break;
    case EAssetsTypes.WALLET:
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_SHOW_WALLETS));
      break;
    case EAssetsTypes.BLOCKCHAIN:
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_SHOW_BLOCKCHAINS));
      break;
    }
  };

  return <Tabs
    activeKey={type||undefined}
    onChange={handleOnChange}
    className="add-modal-tabs"
    moreIcon={true}
  >
    <TabPane
      tab={t('naming.all')}
      tabKey={undefined}
      key={null}
    />
    <TabPane
      tab={t('naming.exchanges')}
      tabKey={EAssetsTypes.EXCHANGE}
      key={EAssetsTypes.EXCHANGE}
    />
    <TabPane
      tab={t('naming.blockchains')}
      tabKey={EAssetsTypes.BLOCKCHAIN}
      key={EAssetsTypes.BLOCKCHAIN}
    />
    <TabPane
      tab={t('naming.wallets')}
      tabKey={EAssetsTypes.WALLET}
      key={EAssetsTypes.WALLET}
    />
  </Tabs>;
});

export default AddModalTab;