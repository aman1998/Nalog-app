import { ModalFuncProps } from "antd/lib/modal";

import { TChildren } from "config/types";

export interface ISettingsModalHeader extends ModalFuncProps {
  children: TChildren;
  showCode: boolean;
  setShowCode: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  title: string;
}