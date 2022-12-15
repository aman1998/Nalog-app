import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { matchPath, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { paths } from "config/paths";
import { EAssetsTypes } from "config/types";

import { IAssetsDataProps } from "components/AssetsPageWrapper/types";
import Button from "components/Buttons/Button";
import BNInput from "components/BNInput";

import { connectAssetsRequest, connectAssetsFailure } from "store/assets/reducers";
import { EConnectMethods, TConnectAssetPayload } from "store/assets/types";
import {
  connectAssetsDataSelector,
  connectAssetsFetchingSelector,
  connectAssetsFailureSelector
} from "store/assets/selectors";
import { analyticEvent } from 'store/analytics/effects';
import { EEventType } from 'store/analytics/types';
import { dashboardOnboardingSelector } from "store/common/selectors";

import { IAssetsFormValues } from "./types";
import { getConnectAssetSchema } from "./validation";

const ConnectAssetsForm: FC<IAssetsDataProps> = ({ selectedAsset }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const loading = useSelector(connectAssetsFetchingSelector);
  const failure = useSelector(connectAssetsFailureSelector)?.parsedErrors;
  const connectData = useSelector(connectAssetsDataSelector);
  const thirdKeyAvailable = !!(selectedAsset?.connect_param3_name && selectedAsset?.type === EAssetsTypes.EXCHANGE);
  const { redirectOnCreateAssets } = useSelector(dashboardOnboardingSelector);
  
  const initialValues = {
    keyOne: "",
    keyTwo: "",
    keyThree: "",
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

  const onSubmit = (values: IAssetsFormValues) => {
    if (!selectedAsset.type) return;

    if (matchPath(location.pathname, paths.SINGLE_REPORT)?.isExact) {
      dispatch(analyticEvent(EEventType.TAXREPORT_STEP1_ACCOUNTS_ADDED));
    }
    
    dispatch(analyticEvent(`${EEventType.WALLET_NEW_ACCOUNT_STEP_2_FINISHING}:${selectedAsset.code}`));

    const requestPayload: TConnectAssetPayload = {
      code: selectedAsset.code,
      data: {
        stock: selectedAsset.id,
        connect_method: EConnectMethods.API_KEY,
      },
    };

    if (redirectOnCreateAssets) {
      requestPayload.redirectToAsset = (assetsId: string) => history.push(`/assets/${assetsId}`);
    }
    if (selectedAsset?.type === EAssetsTypes.EXCHANGE) {
      requestPayload.data = {
        stock: selectedAsset.id,
        connect_method: EConnectMethods.API_KEY,
        api_param1: values.keyOne,
        api_param2: values.keyTwo,
        api_param3: values.keyThree,
      };
    }
    if (selectedAsset?.type === EAssetsTypes.BLOCKCHAIN) {
      requestPayload.data = {
        stock: selectedAsset.id,
        connect_method: EConnectMethods.ADDRESS,
        name: values.keyOne,
        address: values.keyTwo,
      };
    }

    dispatch(
      connectAssetsRequest(requestPayload)
    );
  };

  return (
    <Formik<IAssetsFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={() => getConnectAssetSchema(thirdKeyAvailable)}
    >
      {({ values }) => (
        <Form
          name="nest-messages"
          className="connect-modal_form"
        >
          <BNInput
            type="text"
            name="keyOne"
            error={failure?.api_param1 || failure?.name || failure?.detail}
            showErrorText={!failure?.detail}
            placeholder={selectedAsset?.connect_param1_placeholder || "" }
            label={`${selectedAsset?.type === EAssetsTypes.EXCHANGE 
              ? selectedAsset?.connect_param1_name : t("naming.walletName")}`}
            onFocus={onFocus}
          />
          <BNInput
            type="text"
            name="keyTwo"
            showErrorText={!failure?.detail}
            placeholder={selectedAsset?.connect_param2_placeholder || "" }
            error={failure?.api_param2 || failure?.address || failure?.detail}
            label={`${selectedAsset?.type === EAssetsTypes.EXCHANGE
              ? selectedAsset?.connect_param2_name : t("naming.address_xpub")}`}
            onFocus={onFocus}
          />
          {thirdKeyAvailable && <BNInput
            type="text"
            name="keyThree"
            showErrorText={!failure?.detail}
            placeholder={selectedAsset?.connect_param3_placeholder || "" }
            error={failure?.api_param3 || failure?.detail}
            label={`${selectedAsset?.type === EAssetsTypes.EXCHANGE ? selectedAsset?.connect_param3_name : ""}`}
            onFocus={onFocus}
          />}
          <Button
            loading={loading}
            htmlType="submit"
            disabled={
              !values.keyOne.trim()
              || !values.keyTwo.trim()
              || (thirdKeyAvailable && !values.keyThree?.trim())
              || !!failure
            }
            className="connect-btn"
            title={selectedAsset?.type === EAssetsTypes.EXCHANGE ? t("naming.protectedImport") : t("naming.import")}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ConnectAssetsForm;
