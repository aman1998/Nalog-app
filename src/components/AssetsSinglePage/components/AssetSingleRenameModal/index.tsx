import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "antd/lib/modal";
import { Form, Formik } from "formik";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import Button from "components/Buttons/Button";

import { TRenameSingleAssetValues } from "store/assets/types";
import { renameSingleAssetRequest } from "store/assets/reducers";
import { getSingleAssetDataSelector, renameSingleAssetFetchingSelector } from "store/assets/selectors";

import { AssetSingleRenameModalProps } from "./types";
import { RenameAssetSingleSchema } from "./validation";
import AssetSingleRenameModalInput from "./components/AssetSingleRenameModalInput";

const AssetSingleRenameModal: React.FC<AssetSingleRenameModalProps> = ({ visible, onOk, onCancel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const loading = useSelector(renameSingleAssetFetchingSelector(id));
  const data = useSelector(getSingleAssetDataSelector(id));
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const initialValue: TRenameSingleAssetValues = {
    name: data?.name ? data?.name : "",
  };

  const onSubmit = (values: TRenameSingleAssetValues) => {
    dispatch(renameSingleAssetRequest({ id, values, callOnSuccess: onOk }));
  };

  return (
    <Modal
      className={"asset-rename-modal"}
      visible={visible}
      title={t('naming.changeName')}
      footer={false}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      width={isMobile ? 328 : 636}
    >
      <Formik
        initialValues={initialValue}
        validationSchema={RenameAssetSingleSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isValid, dirty }) => (
          <div className="asset-rename-modal__wrapper">
            <Form autoComplete={"off"}>
              <AssetSingleRenameModalInput/>
              <Button
                className="asset-rename-modal__save-btn"
                title={t('naming.save')}
                htmlType="submit"
                loading={loading}
                disabled={!(isValid && dirty) || loading}
              />
            </Form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default AssetSingleRenameModal;
