import * as Yup from "yup";
import { ObjectSchema } from "yup/lib";
import { Assign, ObjectShape } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";

import { requiredStringField } from "utils/validationRules";


type ConnectAssetSchemaShape = {
  keyOne: RequiredStringSchema<string | undefined, Record<string, any>>;
  keyTwo: RequiredStringSchema<string | undefined, Record<string, any>>;
  keyThree?: RequiredStringSchema<string | undefined, Record<string, any>>;
}

type TGetConnectAssetSchema = ObjectSchema<Assign<
  ObjectShape, ConnectAssetSchemaShape>>

export const getConnectAssetSchema = (thirdKeyAvailable: boolean): TGetConnectAssetSchema => {
  let shape: ConnectAssetSchemaShape = {
    keyOne: requiredStringField,
    keyTwo: requiredStringField
  };

  if (thirdKeyAvailable) {
    shape = {
      ...shape,
      keyThree: requiredStringField
    };
  }
  
  return Yup.object().shape(shape);
};
