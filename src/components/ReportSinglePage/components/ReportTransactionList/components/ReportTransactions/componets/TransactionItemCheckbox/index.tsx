import { FC } from 'react';
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { TCheckboxChangeEvent } from "components/BNCheckbox/types";

import { changeReportCheckStatusRequest } from "store/reports/reducers";
import { changeReportCheckStatusRequestSelector } from "store/reports/selectors";

import { TransactionItemCheckboxProps } from "./types";

const TransactionItemCheckbox: FC<TransactionItemCheckboxProps> = ({ checked, transactionId }) => {
  const checkStatusReports = useSelector(changeReportCheckStatusRequestSelector);
  const dispatch = useDispatch();

  return <Checkbox
    className="transactions-item__checkbox"
    defaultChecked={checked}
    checked={checked}
    disabled={checkStatusReports[transactionId]?.fetching}
    onChange={(e: TCheckboxChangeEvent) => dispatch(changeReportCheckStatusRequest({
      id: transactionId,
      checked: e.target.checked,
    }))}
  />;
};

export default TransactionItemCheckbox;