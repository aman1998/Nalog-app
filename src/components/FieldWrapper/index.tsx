import { Tooltip } from "antd";
import { FC, useEffect } from "react";
import cn from "classnames";
import isFunction from "lodash/isFunction";

import { validationText } from "utils/validationRules";

import AssetNoteIcon from "../Icons/AssetNoteIcon";
import BNTooltip from "../BNTooltip";

import { IFieldWrapper } from "./types";

const FieldWrapper: FC<IFieldWrapper> = ({
  label,
  name,
  tooltip,
  error,
  meta,
  wrapperClass,
  showErrorText,
  analyticOnError,
  info,
  children
}) => {

  useEffect(() => {
    if (error) {
      if (isFunction(analyticOnError)) analyticOnError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, showErrorText]);

  return (
    <div className={cn("field-wrapper", wrapperClass)}>
      {!!label && (
        <div className="field-wrapper-label">
          <label htmlFor={name} className="label">
            {label}
          </label>
          {info && <BNTooltip title={info}>
            <span className="field-wrapper-info">
              <AssetNoteIcon />
            </span>
          </BNTooltip>}
        </div>
      )}
      <Tooltip title={tooltip} trigger={["focus", "hover"]} overlayClassName="custom-tooltip">
        {children}
      </Tooltip>

      <div
        className={cn("validate", {
          "validate-active": meta?.error && meta?.error !== validationText.requiredText,
        })}
      >
        {meta?.error === validationText.requiredText ? "" :  meta?.touched && meta?.error}
      </div>
      <div
        className={cn("validate", {
          "validate-active": error,
        })}
      >
        {showErrorText && error}
      </div>
    </div>
  );};
export default FieldWrapper;
