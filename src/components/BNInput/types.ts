import { IInputProps } from "../Inputs/types";
import { IFieldWrapperProps } from "../FieldWrapper/types";

export interface IBNInput extends  IInputProps, Omit<IFieldWrapperProps, 'name'> {
  name: string
}
