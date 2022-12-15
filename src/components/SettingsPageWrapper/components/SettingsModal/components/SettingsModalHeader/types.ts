export interface ISettingsModalHeader {
  isBackIcon?: boolean;
  title: string;
  setShowCode: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  showCode: boolean;
}
