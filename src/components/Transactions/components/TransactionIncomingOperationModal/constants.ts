import { ETransactionsOperationsTypes } from "config/types";

import { ETransactionsFilePurpose } from "store/transactions/types";


export const optionFileNames: Record<string, string[]> = {
  [ETransactionsOperationsTypes.cryptoIncomePurchase]: [
    ETransactionsFilePurpose.purchaseTrade, ETransactionsFilePurpose.purchasePayment
  ],
  [ETransactionsOperationsTypes.cryptoIncomePayment]: [
    ETransactionsFilePurpose.serviceAgreement
  ],
  [ETransactionsOperationsTypes.cryptoIncomeAirdrop]: [
    ETransactionsFilePurpose.airdropAddress, ETransactionsFilePurpose.airdropParticipation
  ],
  [ETransactionsOperationsTypes.cryptoIncomeFork]: [
    ETransactionsFilePurpose.forkOccurred, ETransactionsFilePurpose.forkAssetOwnership
  ],
  [ETransactionsOperationsTypes.cryptoIncomeLoan]: [
    ETransactionsFilePurpose.loanAgreement
  ],
  [ETransactionsOperationsTypes.cryptoIncomeMyTransfer]: [
    ETransactionsFilePurpose.myTransferAddressOwnership
  ],
  [ETransactionsOperationsTypes.p2pPurchase]: [
    ETransactionsFilePurpose.purchasePayment
  ],
  [ETransactionsOperationsTypes.cryptoIncomeMining]: [
    ETransactionsFilePurpose.miningActivty,
    ETransactionsFilePurpose.miningReward
  ],
  [ETransactionsOperationsTypes.cryptoIncomeStakingReward]: [
    ETransactionsFilePurpose.stakingActivity,
    ETransactionsFilePurpose.stakingReward,
  ],
  [ETransactionsOperationsTypes.cryptoIncomeStakingReturn]: [
    ETransactionsFilePurpose.stakingActivity,
    ETransactionsFilePurpose.stakingReturn
  ],
  [ETransactionsOperationsTypes.cryptoIncomeLendingReward]: [
    ETransactionsFilePurpose.lendingActivity,
    ETransactionsFilePurpose.lendingReward,
  ],
  [ETransactionsOperationsTypes.cryptoIncomeLendingReturn]: [
    ETransactionsFilePurpose.lendingActivity,
    ETransactionsFilePurpose.lendingReturn,
  ],
  [ETransactionsOperationsTypes.cryptoIncomeP2e]: [
    ETransactionsFilePurpose.p2eActivity,
    ETransactionsFilePurpose.p2eReward,
  ],
  [ETransactionsOperationsTypes.cryptoIncomeGift]: [
    ETransactionsFilePurpose.giftAgreement,
  ],
  [ETransactionsOperationsTypes.cryptoIncomeOtherReward]: [
    ETransactionsFilePurpose.otherRewardReason,
  ],
};

export const fileNameSettings: Record<string, { title: string, description: string }> = {
  [ETransactionsFilePurpose.purchaseTrade]: {
    title: "transactionFileNameSettings.purchaseTradeTitle",
    description: "transactionFileNameSettings.purchaseTradeDescription",
  },
  [ETransactionsFilePurpose.purchasePayment]: {
    title: "transactionFileNameSettings.purchasePaymentTitle",
    description: "transactionFileNameSettings.purchasePaymentDescription",
  },
  [ETransactionsFilePurpose.airdropAddress]: {
    title: "transactionFileNameSettings.airdropAddressTitle",
    description: "transactionFileNameSettings.airdropAddressDescription",
  },
  [ETransactionsFilePurpose.airdropParticipation]: {
    title: "transactionFileNameSettings.airdropParticipationTitle",
    description: "transactionFileNameSettings.airdropParticipationDescription",
  },
  [ETransactionsFilePurpose.forkOccurred]: {
    title: "transactionFileNameSettings.forkOccurredTitle",
    description: "transactionFileNameSettings.forkOccurredDescription",
  },
  [ETransactionsFilePurpose.forkAssetOwnership]: {
    title: "transactionFileNameSettings.forkAssetOwnershipTitle",
    description: "transactionFileNameSettings.forkAssetOwnershipDescription",
  },
  [ETransactionsFilePurpose.loanAgreement]: {
    title: "transactionFileNameSettings.loanAgreementTitle",
    description: "transactionFileNameSettings.loanAgreementDescription",
  },
  [ETransactionsFilePurpose.serviceAgreement]: {
    title: "transactionFileNameSettings.serviceAgreementTitle",
    description: "transactionFileNameSettings.serviceAgreementDescription",
  },
  [ETransactionsFilePurpose.myTransferAddressOwnership]: {
    title: "transactionFileNameSettings.myTransferAddressOwnershipTitle",
    description: "transactionFileNameSettings.myTransferAddressOwnershipDescription",
  },
  [ETransactionsFilePurpose.miningActivty]: {
    title: "transactionFileNameSettings.miningActivityTitle",
    description: "transactionFileNameSettings.miningActivityDescription",
  },
  [ETransactionsFilePurpose.miningReward]: {
    title: "transactionFileNameSettings.miningRewardTitle",
    description: "transactionFileNameSettings.miningRewardDescription",
  },
  [ETransactionsFilePurpose.stakingActivity]: {
    title: "transactionFileNameSettings.stakingActivityTitle",
    description: "transactionFileNameSettings.stakingActivityDescription",
  },
  [ETransactionsFilePurpose.stakingReward]: {
    title: "transactionFileNameSettings.stakingRewardTitle",
    description: "transactionFileNameSettings.stakingRewardDescription",
  },
  [ETransactionsFilePurpose.stakingReturn]: {
    title: "transactionFileNameSettings.stakingReturnTitle",
    description: "transactionFileNameSettings.stakingReturnDescription",
  },
  [ETransactionsFilePurpose.lendingActivity]: {
    title: "transactionFileNameSettings.lendingActivityTitle",
    description: "transactionFileNameSettings.lendingActivityDescription",
  },
  [ETransactionsFilePurpose.lendingReward]: {
    title: "transactionFileNameSettings.lendingRewardTitle",
    description: "transactionFileNameSettings.lendingRewardDescription",
  },
  [ETransactionsFilePurpose.lendingReturn]: {
    title: "transactionFileNameSettings.lendingReturnTitle",
    description: "transactionFileNameSettings.lendingReturnDescription",
  },
  [ETransactionsFilePurpose.p2eActivity]: {
    title: "transactionFileNameSettings.p2eActivityTitle",
    description: "transactionFileNameSettings.p2eActivityDescription",
  },
  [ETransactionsFilePurpose.p2eReward]: {
    title: "transactionFileNameSettings.p2eRewardTitle",
    description: "transactionFileNameSettings.p2eRewardDescription",
  },
  [ETransactionsFilePurpose.giftAgreement]: {
    title: "transactionFileNameSettings.giftAgreementTitle",
    description: "transactionFileNameSettings.giftAgreementDescription",
  },
  [ETransactionsFilePurpose.otherRewardReason]: {
    title: "transactionFileNameSettings.otherRewardReasonTitle",
    description: "transactionFileNameSettings.otherRewardReasonDescription",
  },
};
