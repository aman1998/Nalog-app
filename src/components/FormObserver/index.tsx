import { useFormikContext } from "formik";
import { useEffect } from "react";
import isEqual from "lodash/isEqual";

export type FormObserverProps = {
  onChangeValues: (value: any) => void
}

const FormObserver = ({ onChangeValues }: FormObserverProps): null => {
  const { values, initialValues } = useFormikContext();
  useEffect(() => {
    if (!isEqual(values, initialValues)) {
      onChangeValues(values);
    }
  }, [values]);
  return null;
};

export default FormObserver;
