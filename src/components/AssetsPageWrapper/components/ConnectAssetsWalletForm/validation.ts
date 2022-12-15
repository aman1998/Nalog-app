import * as Yup from "yup";
import _ from "lodash";

import { requiredStringField } from "utils/validationRules";

import i18n from "../../../../i18n";

declare module 'yup' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  interface ArraySchema<T> {
    uniqueProperty(name: string, message?: any): ArraySchema<T>;
  }
}

Yup.addMethod(Yup.array, 'uniqueProperty', function(propertyPath, message) {
  return this.test('unique', '', function(list) {
    const errors: any[] = [];

    list?.forEach((item, index) => {
      const propertyValue = _.get(item, propertyPath);

      if (propertyValue && _.filter(list, [propertyPath, propertyValue]).length > 1) {
        errors.push(
          this.createError({
            path: `${this.path}[${index}].${propertyPath}`,
            message: i18n.t(message),
          })
        );
      }
    });

    if (!_.isEmpty(errors)) {
      throw new Yup.ValidationError(errors);
    }

    return true;
  });
});

export const ConnectAssetWalletSchema = Yup.object().shape({
  blockchains: Yup.array()
    .of(
      Yup.object().shape({
        stock: requiredStringField,
        address: requiredStringField
      })
    )
    .uniqueProperty('address', i18n.t('connectAssetsWalletForm.uniqueAddress'))
});
export default Yup;