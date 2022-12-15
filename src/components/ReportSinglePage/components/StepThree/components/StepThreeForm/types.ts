import { Ref } from "react";
import { FormikProps } from "formik";

import { TNewReportOptionData } from "store/reports/types";

export type TStepThreeProps = {
  formikRef: Ref<FormikProps<TNewReportOptionData>>
}
