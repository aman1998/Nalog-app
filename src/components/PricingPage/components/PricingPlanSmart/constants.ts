import i18n from "../../../../i18n";

import { TFeatures } from "../PricingCardFeatures";

export const availableFeatures: TFeatures = [
  [
    {
      title: i18n.t("pricingFeatures.portfolioTracker"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.unlimitedAPIs"),
      subTitle: null,
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.p2pStatistics"),
      subTitle: i18n.t("pricingFeatures.pro"),
      checked: true
    },
    {
      title: i18n.t("pricing.notesAndTags"),
      subTitle: i18n.t("pricingFeatures.nOLimitation"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.blockingRiskRate"),
      checked: true,
    },
    {
      title: i18n.t("pricingFeatures.risksDetailsAndFixingAdvices"),
      subTitle: '',
      checked: true,
      pink: true,
    },
    {
      title: i18n.t("pricingFeatures.AMLRiskScoreAndIssueDetails"),
      checked: true,
      pink: true,
    },
  ],
  [
    {
      title: i18n.t("pricingFeatures.taxForms"),
      subTitle: i18n.t("pricingFeatures.numberTransactionsCurrentYear", { number: 1000 }),
      checked: true,
    },
    {
      title: i18n.t("pricingFeatures.transactionsExport"),
      subTitle: i18n.t("pricingFeatures.nOLimitation"),
      checked: true,
    },
    {
      title: i18n.t("pricingFeatures.AMLDocs"),
      subTitle: i18n.t("pricingFeatures.nOLimitation"),
      checked: true,
    },
    {
      title: i18n.t("pricing.fileStorage"),
      subTitle: i18n.t("pricingFeatures.numberMB", { number: 500 }),
      checked: true,
    },
    {
      title: i18n.t("pricingFeatures.cryptoDocuments"),
      subTitle: i18n.t("pricingFeatures.basic"),
      checked: true,
    },
  ],
  [
    {
      title: i18n.t("pricingFeatures.oKmanBotAndOnlineChat"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.academy"),
      subTitle: i18n.t("pricingFeatures.pro"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.emailSupport"),
      checked: true,
      pink: true
    }
  ]
];
