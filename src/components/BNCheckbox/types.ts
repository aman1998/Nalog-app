export type TCheckboxChangeEventTarget = {
  checked: boolean;
}

export type TCheckboxChangeEvent = {
  target: TCheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export type CheckboxValueType = string | number | boolean;

