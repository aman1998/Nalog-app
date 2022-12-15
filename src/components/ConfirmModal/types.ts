export type TNewReportCancelModalProps = {
  icon: JSX.Element;
  btns: JSX.Element;
  title: string,
  text: string,
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
  width?: number;
};
