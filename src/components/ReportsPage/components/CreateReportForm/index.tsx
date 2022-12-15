import { useRef } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormikHelpers } from "formik/dist/types";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { mobileMediaWidth } from "config/constants";

import BNSelect from "components/BNSelect";
import BNNumericInput from "components/BNNumericInput";
import BNInput from "components/BNInput";
import Button from "components/Buttons/Button";
import ConfirmModal from "components/ConfirmModal";
import DangerIcon from "components/Icons/DangerIcon";

import {
  cancelReportModalSelector,
  draftReportModalSelector,
  newReportFailureSelector,
  newReportFetchingSelector,
  successReportModalSelector,
} from "store/reports/selectors";
import { createReportRequest, getReportsRequest, setReportModals } from "store/reports/reducers";
import { TOldReportOptionData } from "store/reports/types";

import { CreateReportSchema } from "./validation";
import { initialValue, yearsOptions } from './constants';
import NewReportSuccessModal from "./NewReportSuccessModal";
import NewReportDraftModal from "./NewReportDraftModal";

const CreateReportForm = (): JSX.Element => {
  const { t } = useTranslation();
  const draft = true;
  const dispatch = useDispatch();
  const formikRef = useRef<FormikProps<TOldReportOptionData>>(null);
  const parsedErrors = useSelector(newReportFailureSelector)?.parsedErrors;
  const loading = useSelector(newReportFetchingSelector);
  const successModalVisible = useSelector(successReportModalSelector);
  const cancelModalVisible = useSelector(cancelReportModalSelector);
  const draftModalVisible = useSelector(draftReportModalSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const onSubmit = (data: TOldReportOptionData, { resetForm }: FormikHelpers<TOldReportOptionData>) => {
    const callOnSuccess = () => {
      resetForm();
      dispatch(setReportModals({ key: "create", value: false }));
      dispatch(setReportModals({ key: "success", value: true }));
      setTimeout(() => dispatch(getReportsRequest()), 5000);
    };
    dispatch(createReportRequest({ data, callOnSuccess }));
  };

  const openAsDraftModal = () => {
    dispatch(setReportModals({ key: "draft", value: true }));
  };

  const closeModal = () => {
    formikRef.current?.resetForm();
    dispatch(setReportModals({ key: "cancel", value: false }));
    dispatch(setReportModals({ key: "create", value: false }));
  };

  const submitAsDraftModal = () => {
    formikRef.current?.resetForm();
    dispatch(setReportModals({ key: "create", value: false }));
    dispatch(setReportModals({ key: "draft", value: false }));
  };

  return (
    <>
      <Formik<TOldReportOptionData>
        innerRef={formikRef}
        initialValues={initialValue}
        validationSchema={CreateReportSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <Form autoComplete={"off"} className="create-report-modal__wrapper">
            <div className="create-report-modal__content">
              <div className="create-report-modal__header">
                <h3>{t("naming.taxReturn")}</h3>
                <BNSelect
                  name="year"
                  options={yearsOptions}
                  defaultValue={2021}
                  wrapperClass="create-report-modal__year"
                  error={parsedErrors?.year}
                  disabled={loading}
                />
              </div>
              <div className={cn("create-report-modal__fields", { row: !isMobile })}>
                <BNNumericInput
                  name="tax_authority"
                  label={t("createReport.codeIFTS")}
                  maxLength={4}
                  wrapperClass="create-report-modal__tax_authority"
                  error={parsedErrors?.tax_authority}
                  disabled={loading}
                />
                <BNNumericInput
                  name="oktmo_code"
                  label={t("createReport.municipalityOKTMO")}
                  maxLength={8}
                  wrapperClass="create-report-modal__oktmo_code"
                  error={parsedErrors?.oktmo_code}
                  disabled={loading}
                />
              </div>
              <p className="create-report-modal__link-wrapper" 
                dangerouslySetInnerHTML={{ __html: t("createReport.linkText") }} />
            </div>
            <div className="create-report-modal__content">
              <div className="create-report-modal__header">
                <h4>1. {t("createReport.taxpayerData")}</h4>
              </div>
              <div className="create-report-modal__fields column taxpayer">
                <BNNumericInput
                  name="inn"
                  label={t("createReport.inn")}
                  maxLength={12}
                  error={parsedErrors?.inn}
                  disabled={loading}
                />
                <BNInput
                  type="text"
                  name="last_name"
                  label={t("naming.lastName")}
                  error={parsedErrors?.last_name}
                  disabled={loading}
                />
                <BNInput
                  type="text"
                  name="first_name"
                  label={t("naming.firstName")}
                  error={parsedErrors?.first_name}
                  disabled={loading}
                />
                <BNInput
                  type="text"
                  name="patronymic_name"
                  label={t("naming.patronymicName")}
                  error={parsedErrors?.patronymic_name}
                  disabled={loading}
                />
                <div className="create-report-modal__taxpayer__dates">
                  <BNInput
                    type="text"
                    label={t("date.birth")}
                    name="birth_date"
                    placeholder={t("date.birthPlaceholder")}
                    mask="11.11.1111"
                    wrapperClass="create-report-modal__birth_date"
                    error={parsedErrors?.birth_date}
                    disabled={loading}
                  />
                  <BNInput
                    type="text"
                    name="birth_place"
                    label={t("date.birthPlace")}
                    wrapperClass="create-report-modal__birth_place"
                    error={parsedErrors?.birth_place}
                    disabled={loading}
                  />
                </div>
                <BNInput
                  type="text"
                  name="phone"
                  label={t("naming.phone")}
                  wrapperClass="create-report-modal__phone"
                  error={parsedErrors?.phone}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="create-report-modal__content">
              <div className="create-report-modal__header">
                <h4>2. {t("createReport.passportData")}</h4>
              </div>
              <div className="create-report-modal__fields column">
                <div className="create-report-modal__fields__passport">
                  <BNNumericInput
                    name="passport_series"
                    label={t("createReport.series")}
                    maxLength={4}
                    error={parsedErrors?.passport_series}
                    disabled={loading}
                  />
                  <BNNumericInput
                    name="passport_number"
                    label={t("createReport.passportNumber")}
                    maxLength={6}
                    error={parsedErrors?.passport_number}
                    disabled={loading}
                  />
                  <BNInput
                    type="text"
                    label={t("createReport.dateOfIssue")}
                    name="passport_date_issued"
                    placeholder={t("date.birthPlaceholder")}
                    mask="11.11.1111"
                    error={parsedErrors?.passport_date_issued}
                    disabled={loading}
                  />
                </div>
                <BNInput
                  type="text"
                  name="passport_issued_by"
                  label={t("createReport.issuedBy")}
                  error={parsedErrors?.passport_issued_by}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="create-report-modal__btns">
              {!draft && (
                <Button
                  className="create-report-modal__btn"
                  title={t("action.saveToDraft")}
                  loading={loading}
                  transparent={true}
                  disabled={!(isValid) || loading}
                  onClick={openAsDraftModal}
                />
              )}
              <Button
                className="create-report-modal__btn save"
                title={t("createReport.generateReport")}
                htmlType="submit"
                loading={loading}
                disabled={!isValid || loading}
              />
            </div>
          </Form>
        )}
      </Formik>
      <NewReportSuccessModal
        visible={successModalVisible}
        onOk={() => dispatch(setReportModals({ key: "success", value: false }))}
      />
      <ConfirmModal
        title={t("report.wantToCloseForm")}
        text={t("action.enteredDataLost")}
        icon={<DangerIcon />}
        visible={cancelModalVisible}
        btns={
          <>
            <Button title={"action.close"} transparent={true} onClick={closeModal} />
            <Button
              title={t("action.cancel")}
              onClick={() => dispatch(setReportModals({ key: "cancel", value: false }))}
            />
          </>
        }
        onCancel={() => dispatch(setReportModals({ key: "cancel", value: false }))}
        onOk={closeModal}
      />
      <NewReportDraftModal
        onCancel={() => dispatch(setReportModals({ key: "draft", value: false }))}
        onOk={submitAsDraftModal}
        visible={draftModalVisible}
      />
    </>
  );
};

export default CreateReportForm;
