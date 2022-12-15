import i18n from "../../../../i18n";

import { TFeatures } from "../PricingCardFeatures";

export const availableFeatures: TFeatures = [
  [
    {
      title: i18n.t("pricingFeatures.everythingOfSmart"),
      checked: true,
      fat: true
    }
  ],
  [
    {
      title: i18n.t("pricingFeatures.taxForms"),
      subTitle: i18n.t("pricingFeatures.nOLimits"),
      checked: true,
    },
    {
      title: i18n.t("pricing.fileStorage"),
      subTitle: i18n.t("pricingFeatures.numberGB", { number: 5 }),
      checked: true,
    },
    {
      title: i18n.t("pricingFeatures.cryptoDocuments"),
      subTitle: i18n.t("pricingFeatures.pro"),
      checked: true,
    },
  ]
];
