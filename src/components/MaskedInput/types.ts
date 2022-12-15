import { IInputProps } from "../Inputs/types";

export interface IMaskedInput extends Omit<IInputProps, 'mask'> {
  mask: string
}