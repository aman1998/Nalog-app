export type ModalWrapperHeaderProps = {
  handleBack?: false | (() => void)
  isBackIcon?: boolean;
  title: string;
  subTitle?: string;
  closeModal: () => void;
}