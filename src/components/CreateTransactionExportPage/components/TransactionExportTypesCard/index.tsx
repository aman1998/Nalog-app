import { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";
import { OptionData } from "rc-select/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";

import { ETransactionsOperationsTypes } from "config/types";
import { QUERIES } from "config/constants";

import useQuery from "hooks/useQuery";

import { setCreateTransitionExportStepTwoParams } from "store/reports/reducers";
import { createUploadOperationsSelector } from "store/reports/selectors";


const TransactionExportTypesCard: FC<OptionData> = ({ value, label }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);
  const createUploadOperations = useSelector(createUploadOperationsSelector(id));
  const types = get(createUploadOperations, ['stepTwo', 'types'], []) as ETransactionsOperationsTypes[];
  
  const onClickCard = () => {
    if (types?.includes(value as ETransactionsOperationsTypes)) {
      dispatch(setCreateTransitionExportStepTwoParams({
        id, stepTwo: { types: types.filter(type => type !== value) }
      }));
    } else {
      dispatch(setCreateTransitionExportStepTwoParams({
        id, stepTwo: { types: [...types, value as ETransactionsOperationsTypes] } }));
    }
  };

  return <div className="upload-operations__types-card" onClick={onClickCard}>
    <div className="upload-operations__types-card__title">
      {t(label as string)}
    </div>
    <div className="check-checkbox-wrapper">
      <Checkbox value={value} />
    </div>
  </div>;
};

export default TransactionExportTypesCard;