import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, FieldArray } from "formik";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OptionData } from "rc-select/es/interface";

import { paths } from "config/paths";

import { IAssetsDataProps } from "components/AssetsPageWrapper/types";
import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";
import BNSelect from "components/BNSelect";

import { connectAssetsRequest, connectAssetsFailure } from "store/assets/reducers";
import { EConnectMethods, TConnectAssetPayload } from "store/assets/types";
import {
  connectAssetsDataSelector, connectAssetsFailureSelector,
  connectAssetsFetchingSelector,
} from "store/assets/selectors";
import { analyticEvent } from 'store/analytics/effects';
import { EEventType } from 'store/analytics/types';
import { dashboardOnboardingSelector } from "store/common/selectors";

import { ConnectAssetWalletSchema } from "./validation";
import { TAssetsWalletFormValues } from "./types";
import { MAX_VALUES_BLOCKCHEINS_COUNT } from "./constants";

const ConnectAssetsWalletForm: FC<IAssetsDataProps> = ({ selectedAsset }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const history = useHistory();
  const location = useLocation();

  const loading = useSelector(connectAssetsFetchingSelector);
  const connectData = useSelector(connectAssetsDataSelector);
  const failure = useSelector(connectAssetsFailureSelector)?.parsedErrors;
  const { redirectOnCreateAssets } = useSelector(dashboardOnboardingSelector);

  const initialValues: TAssetsWalletFormValues = {
    blockchains: [
      {
        "stock": "",
        "address": ""
      },
    ]
  };

  useEffect(() => {
    if (connectData?.account_id &&
      (location.pathname.includes(paths.ASSETS))) {
      history.push(`/assets/${connectData?.account_id}`);
    }
    return () => {
      dispatch(connectAssetsFailure(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectData]);

  const onFocus = () => {
    dispatch(connectAssetsFailure(null));
  };

  const onSubmit = (values: TAssetsWalletFormValues) => {
    if (!selectedAsset.type) return;

    if (matchPath(location.pathname, paths.SINGLE_REPORT)?.isExact) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_ACCOUNTS_ADDED));
    }

    dispatch(analyticEvent(`${EEventType.WALLET_NEW_ACCOUNT_STEP_2_FINISHING}:${selectedAsset.code}`));

    const data: TConnectAssetPayload = {
      code: selectedAsset.code,
      data: {
        stock: selectedAsset.id,
        connect_method: EConnectMethods.MULTI_ADDRESS,
        blockchains : values.blockchains
      },
    };
    if (redirectOnCreateAssets) {
      data.redirectToAsset = (assetsId: string) => history.push(`/assets/${assetsId}`);
    }
    dispatch(
      connectAssetsRequest(data)
    );
  };

  const options: OptionData[] = selectedAsset.blockchains ? selectedAsset.blockchains.map(blockchain => ({
    label: blockchain.name,
    value: blockchain.id,
  })) : [];

  return (
    <Formik<TAssetsWalletFormValues>
      initialValues={initialValues}
      validationSchema={ConnectAssetWalletSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form
          name="nest-messages"
          className="connect-modal_form"
        >
          <FieldArray name="blockchains">
            {({ remove, push }) => (
              <div className="connect-modal_form__blockcheins">
                {values.blockchains.length > 0 && values.blockchains.map((_, index) => (
                  <div key={index} className="connect-modal_form__blockchein">
                    {(values.blockchains.length > 1 ) && <span
                      className="connect-modal_form__blockchein__delete"
                      onClick={() => remove(index)}
                    >
                      {t("action.delete")}
                    </span>}
                    <BNSelect
                      label={t("naming.blockchein")}
                      name={`blockchains.${index}.stock`}
                      options={options}
                      onFocus={onFocus}
                      showErrorText={!failure?.detail}
                      error={failure?.blockchains[index].stock}
                      placeholder={t("connectAssetsForm.selectFromList")}
                      className="connect-modal_form__blockchein__stock"
                      showSearch={true}
                      filterOption={(input, option) => (
                        option!.children.toUpperCase() as unknown as string).includes(input.toUpperCase()
                      )}
                    />
                    <BNInput
                      type="text"
                      name={`blockchains.${index}.address`}
                      placeholder={t("naming.address_or_xpub_key")}
                      label={t("naming.address_xpub")}
                      onFocus={onFocus}
                      error={failure?.blockchains[index].address}
                    />
                  </div>
                ))}
                { values.blockchains.length < MAX_VALUES_BLOCKCHEINS_COUNT && <div
                  className="connect-modal_form__blockcheins__add-blockchein"
                >
                  <span
                    onClick={() => push({ stock: '', address: '' })}
                  >
                    + {t("connectAssetsForm.addBlockchain")}
                  </span>
                </div>}

              </div>
            )}
          </FieldArray>

          <Button
            loading={loading}
            htmlType="submit"
            className="connect-btn"
            title={t("naming.protectedImport")}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ConnectAssetsWalletForm;
