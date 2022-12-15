import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { Skeleton } from "antd";
import { useMediaQuery } from "react-responsive";

import { EAssetsTypes } from "config/types";
import { maxMobileMediaWidth } from "config/constants";

import { IAssetsModal } from "components/AssetsPageWrapper/types";
import ModalIcon from "components/Icons/ModalIcon";
import VectorArrowIcon from "components/Icons/VectorArrowIcon";
import PopUp from "components/PopUp";

import { getAssetsDetailSelector, showModalSelector } from "store/assets/selectors";
import { dashboardOnboardingSelector } from "store/common/selectors";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import ConnectAssetsForm from "../ConnectAssetsForm";
import ConnectAssetsWalletForm from "../ConnectAssetsWalletForm";
import ConnectAssetsSkeleton from "../ConnectAssetsSkeleton";

const ConnectAssetsModal: FC<IAssetsModal> = ({ selectedAsset, setSelectedAsset, showPopUp, setShowPopUp }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: assetDetail, fetching } = useSelector(getAssetsDetailSelector);
  const visible = useSelector(showModalSelector);
  const { assetsShowTooltip } = useSelector(dashboardOnboardingSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const showInfo = assetDetail?.type === EAssetsTypes.EXCHANGE || assetDetail?.type === EAssetsTypes.WALLET;
  
  const handleComeBack = () => {
    setSelectedAsset(null);
    dispatch(analyticEvent(EEventType.WALLET_NEW_ACCOUNT_STEP_2_GO_BACK));
  };
  
  return (
    <>
      <div className={cn("connect-modal", selectedAsset.type)}>
        <div className="connect-modal_header">
          <div className="close-icon" onClick={handleComeBack}>
            <VectorArrowIcon />
          </div>
          {!fetching ? <div className="connect-modal_info">
            <div className="info-logo">
              <img src={assetDetail?.icon} alt="" />
            </div>
            <div className="info-title">{assetDetail?.name}</div>
          </div> : <Skeleton.Button active={true} className="connect-modal_info__skeleton"/>}
          {(assetDetail?.guide_label && assetDetail?.guide_url) && (
            <a
              className="connect-modal_text"
              href={assetDetail?.guide_url}
              target="_blank"
              rel="noreferrer"
            >
              {assetDetail?.guide_label}
            </a>
          )}
        </div>
        <div className="connect-modal_content">
          {fetching && <ConnectAssetsSkeleton/>}
          {!fetching && assetDetail && assetDetail.type === EAssetsTypes.WALLET &&
          <ConnectAssetsWalletForm selectedAsset={assetDetail} /> }
          {!fetching && assetDetail && assetDetail.type !== EAssetsTypes.WALLET &&
          <ConnectAssetsForm selectedAsset={assetDetail} />}
          {showInfo && (
            <div className="connect-modal_text--bottom">
              <div><ModalIcon /></div>
              <span>
                {t("connectAssetsModal.info")}
              </span>
            </div>
          )}
        </div>
      </div>
      {visible && assetsShowTooltip && showPopUp
      && <PopUp
        title={t("assetsModal.connectAssetsPopUpTitle")}
        text={isMobile ? t("assetsModal.connectAssetsPopUpTextMobile") : t("assetsModal.connectAssetsPopUpText")}
        setVisible={() => setShowPopUp(false)}
        relatedTo="pop-up__in-antd-model"
      />
      }
    </>
  );
};

export default ConnectAssetsModal;
