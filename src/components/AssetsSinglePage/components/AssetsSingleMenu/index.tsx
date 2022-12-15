import { Dropdown } from "antd";
import { useMediaQuery } from "react-responsive";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";
import { getAssetsSinglePath, paths } from "config/paths";

import EllipsisHorizontalIcon from "components/Icons/EllipsisHorizontalIcon";
import ConfirmModal from "components/ConfirmModal";
import Button from "components/Buttons/Button";
import DangerIcon from "components/Icons/DangerIcon";

import { getMyAssetsRequest, getSingleAssetDeleteRequest } from "store/assets/reducers";
import {
  getMyAssetsDataSelector,
  getSingleAssetDataSelector,
} from "store/assets/selectors";

import AssetSingleRenameModal from "../AssetSingleRenameModal";
import AssetSingleEditConnect from "../AssetSingleEditConnect";

import { EAssetsSingleMenuStatesKeys } from "./types";
import AssetsSingleMenuOverlay from "./components/AssetsSingleMenuOverlay";
import { useAssetsSingleMenuState } from "./hooks";

const AssetsSingleMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [visible, setVisibleToggle, setVisibleFalse, setVisibleTrue] = useAssetsSingleMenuState();
  const data = useSelector(getSingleAssetDataSelector(id));
  const myAssets = useSelector(getMyAssetsDataSelector);

  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });

  const onDeleteAsset = () => {
    dispatch(getSingleAssetDeleteRequest({ id, callOnSuccess: redirectHandler }));
    setVisibleFalse(EAssetsSingleMenuStatesKeys.delete);
  };

  const redirectHandler = () => {
    dispatch(getMyAssetsRequest({}));

    if (!myAssets || myAssets?.length === 1 || isMobile) {
      history.push(paths.ASSETS);
      return;
    }
    const arr = [...myAssets];
    const index = arr.findIndex(item => item.id === id);
    arr.splice(index, 1);

    const first = arr[0];
    history.push(getAssetsSinglePath(first.id));
  };

  const handleToggleDropdown = () => {
    setVisibleToggle(EAssetsSingleMenuStatesKeys.dropdown);
  };

  return (
    <>
      <Dropdown
        overlay={<AssetsSingleMenuOverlay setVisibleTrue={setVisibleTrue} setVisibleFalse={setVisibleFalse}/>}
        trigger={[]}
        placement="bottomLeft"
        visible={visible.dropdown}
      >
        <a onClick={handleToggleDropdown}>
          <EllipsisHorizontalIcon />
        </a>
      </Dropdown>
      <ConfirmModal
        icon={<DangerIcon />}
        title={`${t('accountSync.deleteAccount')} ${data?.name && `“${data?.name}“`}?`}
        text={t('accountSync.deleteAccountText')}
        visible={visible.delete}
        onCancel={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.delete)}
        onOk={onDeleteAsset}
        btns={
          <>
            <Button 
              title={t("action.cancel")}
              transparent={true}
              onClick={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.delete)}
            />
            <Button title={t('action.delete')} danger={true} onClick={onDeleteAsset} />
          </>
        }
      />
      {data && (
        <AssetSingleRenameModal
          visible={visible.rename}
          onCancel={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.rename)}
          onOk={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.rename)}
        />
      )}
      {data && (
        <AssetSingleEditConnect
          visible={visible.connect}
          onCancel={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.connect)}
          onOk={() => setVisibleFalse(EAssetsSingleMenuStatesKeys.connect)}
        />
      )}
    </>
  );
};

export default AssetsSingleMenu;
