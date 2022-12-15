import i18n from "../../../../i18n";

import { TFeatures } from "../PricingCardFeatures";

export const availableFeatures: TFeatures = [
  [
    {
      title: i18n.t("pricingFeatures.portfolioTracker"),
      subTitle: null,
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.unlimitedAPIs"),
      subTitle: null,
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.p2pStatistics"),
      subTitle: "BASIC",
      checked: true
    },
    {
      title: i18n.t("pricing.notesAndTags"),
      subTitle: "25 transactions",
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.blockingRiskRate"),
      subTitle: null,
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.risksDetailsAndFixingAdvices"),
      subTitle: null,
      checked: false
    },
    {
      title: i18n.t("pricingFeatures.AMLRiskScoreAndIssueDetails"),
      subTitle: null,
      checked: false
    },
  ],
  [
    {
      title: i18n.t("pricingFeatures.taxForms"),
      subTitle: i18n.t("pricingFeatures.numberTransactionsCurrentYear", { number: 50 }),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.transactionsExport"),
      subTitle: i18n.t("pricingFeatures.numberDaysLimitation", { number: 35 }),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.AMLDocs"),
      subTitle: i18n.t("pricingFeatures.numberDaysLimitation", { number: 7 }),
      checked: true
    },
    {
      title: i18n.t("pricing.fileStorage"),
      subTitle: i18n.t("pricingFeatures.numberMB", { number: 100 }),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.cryptoDocuments"),
      subTitle: i18n.t("pricingFeatures.basic"),
      checked: false
    },
  ],
  [
    {
      title: i18n.t("pricingFeatures.oKmanBotAndOnlineChat"),
      subTitle: i18n.t("pricingFeatures.basic"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.academy"),
      subTitle: i18n.t("pricingFeatures.basic"),
      checked: true
    },
    {
      title: i18n.t("pricingFeatures.emailSupport"),
      subTitle: null,
      checked: false
    },
  ]
];
