import { FC, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useField } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BNInput from "components/BNInput";

import { getSingleAssetDataSelector } from "store/assets/selectors";

const AssetSingleRenameModalInput: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getSingleAssetDataSelector(id));
  const [,, helpers] = useField('name');
  const { setValue } = helpers;

  useEffect(() => {
    setValue(data?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <BNInput type="text" name="name" label={t('naming.accountName')} />;
};

export default AssetSingleRenameModalInput;
