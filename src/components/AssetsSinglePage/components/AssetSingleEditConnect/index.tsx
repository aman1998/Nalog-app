import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "antd/lib/modal";
import { Form, Formik, FormikProps } from "formik";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";

import { TEditConnectSingleAssetData } from "store/assets/types";
import {
  editConnectSingleAssetFetchingSelector,
  editConnectSingleAssetFailureSelector,
  getAssetsDetailSelector,
  getSingleAssetDataSelector
} from "store/assets/selectors";
import {
  editConnectSingleAssetRequest,
  editConnectSingleAssetFailure,
  getAssetsDetailRequest
} from "store/assets/reducers";

import { AssetSingleEditConnectProps } from "./types";
import { EditConnectAssetSingleSchema } from "./validation";

const AssetSingleEditConnect: FC<AssetSingleEditConnectProps> = ({ visible, onOk, onCancel }) => {
  const { t } = useTranslation();
  const formikRef = useRef<FormikProps<TEditConnectSingleAssetData>>(null);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const loading = useSelector(editConnectSingleAssetFetchingSelector(id));
  const failure = useSelector(editConnectSingleAssetFailureSelector(id))?.parsedErrors;
  const { data: asset } = useSelector(getAssetsDetailSelector);
  const myAsset = useSelector(getSingleAssetDataSelector(id));

  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const initialValue: TEditConnectSingleAssetData = {
    api_param1: "",
    api_param2: "",
  };

  const onSubmit = (values: TEditConnectSingleAssetData) => {
    dispatch(editConnectSingleAssetRequest({ id, values, callOnSuccess: onOk }));
  };

  const onFocus = () => {
    dispatch(editConnectSingleAssetFailure({ id, error: null }));
  };

  useEffect(() => {
    if (myAsset?.stock) {
      dispatch(getAssetsDetailRequest({ id: myAsset?.stock }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAsset?.stock]);

  const header = (
    <>
      <div className="asset-edit-connect-modal_info">
        <div className="asset-edit-connect-modal_info-logo">
          <img src={asset?.icon} alt="" />
        </div>
        <Tooltip title={myAsset?.name}>
          <div className="asset-edit-connect-modal_info-title">{myAsset?.name}</div>
        </Tooltip>
      </div>
      {(asset?.guide_label && asset?.guide_url) && <a
        className="asset-edit-connect-modal_text"
        href={asset?.guide_url}
        target="_blank"
        rel="noreferrer"
      >
        {asset?.guide_label}
      </a>}
    </>
  );

  return (
    <Modal
      className="asset-edit-connect-modal"
      visible={visible}
      title={header}
      footer={false}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      width={isMobile ? 328 : 636}
      afterClose={() => {
        dispatch(editConnectSingleAssetFailure({ id, error: null }));
        formikRef.current?.resetForm();
      }}
    >
      <Formik<TEditConnectSingleAssetData>
        initialValues={initialValue}
        validationSchema={EditConnectAssetSingleSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {({ isValid, dirty }) => (
          <div className="asset-edit-connect-modal__wrapper">
            <Form autoComplete={"off"}>
              <BNInput
                type="text"
                name="api_param1"
                label={asset?.connect_param1_name}
                className="asset-edit-connect-modal__api-key"
                error={failure?.api_param1 || failure?.name || failure?.detail}
                showErrorText={!failure?.detail}
                onFocus={onFocus}
              />
              <BNInput
                type="text"
                name="api_param2"
                label={asset?.connect_param2_name}
                error={failure?.api_param2 || failure?.address || failure?.detail}
                showErrorText={!failure?.detail}
                onFocus={onFocus}
              />
              <Button
                className="asset-edit-connect-modal__save-btn"
                title={t('naming.save')}
                htmlType="submit"
                loading={loading}
                disabled={!(isValid && dirty)}
              />
            </Form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default AssetSingleEditConnect;
