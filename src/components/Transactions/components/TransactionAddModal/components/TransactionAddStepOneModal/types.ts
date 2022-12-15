import { RadioChangeEvent } from "antd";

export interface ITransactionStepOneModalProps {
  onChange: (value: RadioChangeEvent) => void;
  onClick: () => void;
}
