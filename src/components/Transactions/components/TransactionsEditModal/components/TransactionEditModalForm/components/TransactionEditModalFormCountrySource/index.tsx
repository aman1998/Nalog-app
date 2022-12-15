import { useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import BNSelect from "components/BNSelect";
import BNCheckbox from "components/BNCheckbox";

import {
  editSingleTransactionSelector,
  transactionEditModalSelector
} from "store/transactions/selectors";
import { getCountriesRequest } from "store/common/reducers";
import { countriesSelector } from "store/common/selectors";

const TransactionEditModalFormCountrySource = (): JSX.Element =>{
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const { data: countries, fetching } = useSelector(countriesSelector);
  const { id } = useSelector(transactionEditModalSelector);
  const { failure } = useSelector(editSingleTransactionSelector(id)) || {};
  const parsedError = failure?.parsedErrors;

  const [, meta] = useField('external_foreign');
  const [,,sourceHelper] = useField('external_source_country');
  const [,,destinationHelper] = useField('external_destination_country');
  const { value } = meta;

  const countriesOptions = useMemo(() => {
    if (!countries) return [];

    const result = [];
    // eslint-disable-next-line no-console
    for(const country of countries) {
      result.push({
        value: country.CODE,
        label: country.SHORTNAME,
      });
    }
    return result;
  }, [countries]);

  useEffect(() => {
    if (!value) {
      sourceHelper.setValue(undefined);
      destinationHelper.setValue(undefined);  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!countries && !fetching) {
      dispatch(getCountriesRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transaction-edit__form-country-source">
      <BNCheckbox name="external_foreign">
        {t("operations.sourceIncomeOutsideOfRussia")}
      </BNCheckbox>
      {value && <div className="transaction-edit__form-country-source__selectors">
        <BNSelect
          showSearch={true}
          placeholder={t("naming.country")}
          name="external_source_country"
          options={countriesOptions}
          label={`${t("operations.countrySourcePayment")} *`}
          info={t("operations.countryWhichFunds")}
          error={parsedError?.external_source_country}
          loading={fetching}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
        <BNSelect
          showSearch={true}
          placeholder={t("naming.country")}
          name="external_destination_country"
          options={countriesOptions}
          label={`${t("operations.countryEnrollmentPayment")} *`}
          info={t("operations.countryAccountFundsCredited")}
          error={parsedError?.external_destination_country}
          loading={fetching}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
      </div>}
    </div>
  );
};

export default TransactionEditModalFormCountrySource;