import { ModalProps } from "antd";

export interface IModalProps extends ModalProps {
  handleBack?: false | (() => void)
  visible: boolean,
  closeModal: () => void;
  title: string,
  subTitle?: string,
  className?: string
}
