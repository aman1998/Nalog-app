import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal as AntdModal } from "antd";

import { getAssetsDetailRequest, showModal } from "store/assets/reducers";
import { showModalSelector } from "store/assets/selectors";
import { TAssetsData } from "store/assets/types";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import ConnectAssetsModal from "../ConnectAssetsModal";
import AddAccountModal from "../AddAccountModal";
import { useAddAccountType } from "../AddAccountModal/hooks";

const AssetsModal: FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<TAssetsData | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const { onClose } = useAddAccountType();
  const visible = useSelector(showModalSelector);
  const dispatch = useDispatch();
  const { assetsShowTooltip } = useSelector(dashboardOnboardingSelector);

  const handleCancel = () => {
    dispatch(showModal(false));

    if (!selectedAsset) {
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_1_CLOSE));
    } else {
      dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_2_CLOSE));
    }
    onClose();
  };

  useEffect(() => {
    if(!visible) setSelectedAsset(null);
  }, [visible]);

  useEffect(() => {
    if (selectedAsset?.id) {
      dispatch(getAssetsDetailRequest({ id: selectedAsset?.id }));
    }
  }, [dispatch, selectedAsset]);

  useEffect(() => {
    setShowPopUp(true);
  }, [visible]);

  return (
    <AntdModal
      centered={true}
      title={false}
      visible={visible}
      footer={false}
      onCancel={handleCancel}
      width={636}
      destroyOnClose={true}
      className={assetsShowTooltip ? "pop-up__in-antd-model" : ""}
    >
      {(selectedAsset) ? (
        <ConnectAssetsModal
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
        />
      ) : (
        <AddAccountModal setSelectedAsset={setSelectedAsset} showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>
      )}
    </AntdModal>
  );
};

export default AssetsModal;
