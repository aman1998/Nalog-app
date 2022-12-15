import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ModalWrapper from "components/ModalWrapper";

import { valueByAssetsFetchingSelector } from "store/assets/selectors";

import DashboardAssetsItems from "../DashboardAssetsItems";
import DashboardAssetsItemsSkeleton from "../DashboardAssetsItemsSceleton";

import { DashboardAssetsModalProps } from "./types";


const DashboardAssetsModal: FC<DashboardAssetsModalProps> = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const loading = useSelector(valueByAssetsFetchingSelector);
  
  return (
    <ModalWrapper
      visible={visible}
      closeModal={() => setVisible(false)}
      title={t('naming.yourCryptoAssets')}
      destroyOnClose={true}
      className="dashboard-assets-modal"
      width={508}
    >
      {
        loading
          ? <DashboardAssetsItemsSkeleton/>
          : <DashboardAssetsItems isModal={true} />
      }
    </ModalWrapper>
  );
};

export default DashboardAssetsModal;
