import { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { Checkbox } from "antd";
import "moment/locale/en-gb";
import get from "lodash/get";

import { QUERIES, transactionOperation, transactionOperationTypes } from "config/constants";
import { ETransactionsOperationsTypes, ETransactionsTypesRu } from "config/types";

import RangeDatePicker from "components/RangeDatePicker";
import Select from "components/Select";
import { CheckboxValueType, TCheckboxChangeEvent } from "components/BNCheckbox/types";

import useQuery from "hooks/useQuery";

import { setCreateTransitionExportStepTwoParams } from 'store/reports/reducers';
import { createUploadOperationsSelector } from "store/reports/selectors";

import TransactionExportTypesCard from '../TransactionExportTypesCard';

import { documentLaguageOptions } from "./constants";

const CheckboxGroup = Checkbox.Group;

export type TransactionExportStepTwoProps = {
  defaultOperations?: ETransactionsOperationsTypes[]
  operationTypes?: { value: ETransactionsOperationsTypes, label: ETransactionsTypesRu }[]
}

const TransactionExportStepTwo: FC<TransactionExportStepTwoProps> = ({
  defaultOperations = transactionOperation,
  operationTypes = transactionOperationTypes
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const id = query.get(QUERIES.createSourceId);

  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
  const createUploadOperations= useSelector(createUploadOperationsSelector(id));
  const { types, language, date_from, date_to } = get(createUploadOperations, ['stepTwo'],
    { types: undefined, language: undefined, date_from: undefined, date_to: undefined });

  const handleChange = (value: any) => {
    dispatch(setCreateTransitionExportStepTwoParams({ id, stepTwo: value }));
  };

  const handleDatePicker = (value: RangeValue<Moment>) => {
    if (value?.length && value.length > 1) {
      setDateRange([value[0], value[1]]);
      handleChange({
        date_from: value[0] && moment(value[0]).format(),
        date_to: value[1] && moment(value[1]).format(),
      });
    } else {
      setDateRange(null);
      handleChange({
        date_from: null,
        date_to: null,
      });
    }
  };

  const onCheckAllChange = (e: TCheckboxChangeEvent) => {
    handleChange({ types: e.target.checked ? defaultOperations : [] });
  };
  
  const onChangeCheckbox = (list: CheckboxValueType[]) => {
    handleChange({ types: list });
  };
  
  useEffect(() => {
    if (date_from && date_to) {
      setDateRange([moment(date_from), moment(date_to)]);
    }
    if (!language) {
      handleChange({ language: i18n.language, types: defaultOperations });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="upload-operations__step-two">
      <div className="container">
        <div className="upload-operations__step-two__row">
          <div className="upload-operations__step-two__row__title">
            {t("transitionExportStepTwo.dateRange")}
          </div>
          <RangeDatePicker
            placeholder={[t('date.from'), t('date.to')]}
            onChange={handleDatePicker}
            value={dateRange}
            className="upload-operations__step-two__range-date-picker"
            ranges={{
              [t("naming.monthsNumber", { count: 3 })]: [moment().subtract(3, 'month'), moment()],
              [t("naming.monthsNumber", { count: 6 })]: [moment().subtract(6, 'month'), moment()],
              [t("naming.lastMonth")]: [
                moment().subtract(1,'months').startOf('month'),
                moment().subtract(1,'months').endOf('month')
              ],
            }}
          />
        </div>
        <div className="upload-operations__step-two__row">
          <div className="upload-operations__step-two__row__title">
            {t("transitionExportStepTwo.documentLanguage")}
          </div>
          <Select
            options={documentLaguageOptions}
            onChange={value => handleChange({ language: value })}
            value={language || undefined}
            className="upload-operations__step-two__document-language"
          />
        </div>
        <div className="upload-operations__step-two__row">
          <div className="upload-operations__step-two__row__title types">
            {t("transitionExportStepTwo.operationTypes")}
          </div>
          {
            <Fragment>
              <Checkbox
                onChange={onCheckAllChange}
                checked={operationTypes.filter(item => item.value).length === types?.length}
                className="upload-operations__step-two__all-check"
              >
                <span className="upload-operations__step-two__all-check-text">{t("action.chooseAll")}</span>
              </Checkbox>
              <CheckboxGroup value={types} onChange={onChangeCheckbox}
                className="upload-operations__step-two__check-wrapper">
                {
                  operationTypes.filter(item => item.value).map(item => (
                    <TransactionExportTypesCard key={item.value} value={item.value} label={item.label}/>)
                  )
                }
              </CheckboxGroup>
            </Fragment>
          }
        </div>
      </div>
    </div>
  );
};

export default TransactionExportStepTwo;