import { TNullable } from "config/types";

export type BNPromptProps = {
  className?: string;
  text?: TNullable<string>;
  defaultPromptText?: JSX.Element;
  onClose?: () => void;
  onOpen?: () => void;
}
