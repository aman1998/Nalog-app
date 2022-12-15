import { paths } from "./paths";

export enum ELinks {
  HOME = "naming.dashboard",
  ASSETS = "naming.exchangesAndWallets",
  DOCUMENTS = "naming.documents",
  REPORTS = "naming.reports",
  PROFILE = "naming.profile",
  SETTINGS = "naming.settings",
  TRANSACTIONS = "naming.operations",
  SETTINGS_MAIN = "naming.main",
  SETTINGS_SAFETY = "naming.securityAndEntry",
  SETTINGS_SERVICES = "naming.connectedServices", // Подключенные услуги
  SETTINGS_REPORTS = "naming.reporting", // Отчетность
  SETTINGS_OTHER = "naming.other",
  SETTINGS_PLAN_AND_PAYMENT = "naming.planAndPayment",
  PRICING = "naming.pricing",
}


export enum EAssetsTypes { // need remove to assets types
  EXCHANGE = "EXCHANGE",
  BLOCKCHAIN = "BLOCKCHAIN",
  WALLET = "WALLET",
}

export type TNullable<T> = T | null;

export enum EStatus {
  draft = "draft",
  formed = "formed",
  forming = "forming",
  error = "error",
}

export enum ESyncErrorStatus {
  INVALID_API_KEY= "INVALID_API_KEY",
  INVALID_API_SECRET = "INVALID_API_SECRET",
  INVALID_ADDRESS = "INVALID_ADDRESS",
  API_LIMIT_REACHED = "API_LIMIT_REACHED"
}

export enum ESyncStatus {
  synchronized = "synchronized",
  synchronizing = "synchronizing",
  error = "error",
}
export interface IIconsProps {
  className?: string;
  onClick?: () => void;
  fill?: string;
}

export type TFilterData = {
  value: string;
  label: string;
};

export enum ETransactionsTypesRu {
  all = "operations.allOperations",

  // new types
  tradeSpot = "operations.tradeSpot",
  tradeOtc = "operations.tradeOtc",
  cryptoTransfer = "operations.cryptoTransfer",
  innerTransfer = "operations.innerTransfer",
  cryptoOutcome = "operations.cryptoOutcome",
  cryptoOutcomeSale = "operations.cryptoOutcomeSale",
  cryptoIncome = "operations.cryptoIncome",
  cryptoIncomeAirdrop = "operations.cryptoIncomeAirdrop",
  cryptoIncomeFork = "operations.cryptoIncomeFork",
  cryptoIncomeLoan = "operations.cryptoIncomeLoan",
  cryptoIncomeMyTransfer = "operations.cryptoIncomeMyTransfer",
  cryptoIncomePurchase = "operations.cryptoPurchase",
  cryptoIncomePayment = "operations.cryptoIncomePayment",
  cryptoIncomeMining = "operations.cryptoIncomeMining",
  cryptoIncomeStakingReward = "operations.cryptoIncomeStakingReward",
  cryptoIncomeStakingReturn = "operations.cryptoIncomeStakingReturn",
  cryptoIncomeLendingReward = "operations.cryptoIncomeLendingReward",
  cryptoIncomeLendingReturn = "operations.cryptoIncomeLendingReturn",
  cryptoIncomeP2e = "operations.cryptoIncomeP2e",
  cryptoIncomeGift = "operations.cryptoIncomeGift",
  cryptoIncomeOtherReward = "operations.cryptoIncomeOtherReward",
  fiatOutcome = "operations.fiatOutcome",
  fiatIncome = "operations.fiatIncome",
  p2pSale = "operations.p2pSale",
  p2pPurchase = "operations.p2pPurchase",
  manualP2pSale = "operations.manualP2pSale",
  manualP2pPurchase = "operations.manualP2pPurchase",
  cryptoSale = "operations.cryptoSale",
  cryptoPurchase = "operations.cryptoPurchase",
  tradePositionOpening = 'operations.opening',
  tradePositionClosing = 'operations.closing'
}

export enum ETransactionsOperationsTypes {
  // new actual types
  tradeSpot = "trade:spot", // Сделка на спот
  tradeOtc = "trade:otc", // Обмен OTC
  cryptoTransfer = "crypto:transfer", // Перевод
  innerTransfer = "crypto:inner_transfer", // Внутренний еревод
  cryptoOutcome = "crypto:outcome", // Вывод
  cryptoOutcomeSale = "crypto:outcome:sale", // Продажа криптовалюты

  cryptoIncome = "crypto:income", // Поступление
  cryptoIncomeAirdrop = 'crypto:income:airdrop', // Аирдроп
  cryptoIncomeFork = 'crypto:income:fork', // Форк
  cryptoIncomeLoan = 'crypto:income:loan', // Получение в долг
  cryptoIncomePurchase = "crypto:income:purchase", // Покупка криптовалюты
  cryptoIncomeMyTransfer = "crypto:income:my_transfer", // Перевод с кошелька
  cryptoIncomePayment = "crypto:income:payment",
  cryptoIncomeMining = "crypto:income:mining",
  cryptoIncomeStakingReward = "crypto:income:staking_reward",
  cryptoIncomeStakingReturn = "crypto:income:staking_return",
  cryptoIncomeLendingReward = "crypto:income:lending_reward",
  cryptoIncomeLendingReturn = "crypto:income:lending_return",
  cryptoIncomeP2e = "crypto:income:p2e",
  cryptoIncomeGift = "crypto:income:gift",
  cryptoIncomeOtherReward = "crypto:income:other_reward",

  fiatOutcome = "fiat:outcome", // Вывод на карту
  fiatIncome = "fiat:income", // Пополнение с карты
  p2pSale = "p2p:sale", // Продажа на P2P
  p2pPurchase = "p2p:purchase", // Покупка на P2P
  manualP2pPurchase = "manual:p2p:purchase", // Покупка в P2P обменнике
  manualP2pSale = "manual:p2p:sale", // Продажа в P2P обменнике
  cryptoSale = "group:crypto_sale", // Продажа криптовалюты
  cryptoPurchase = "group:crypto_purchase", // Покупка криптовалюты
  tradePositionOpening = 'trade:position:opening',
  tradePositionClosing = 'trade:position:closing',
}

export type TRefInput = {
  refinput?: React.MutableRefObject<any>;
};

export type TChildren = React.ReactChild | React.ReactChild[] | React.FC;

export enum EValidateNames {
  email = "email",
  phone = "phone",
}

export type TLinks = {
  id: number;
  to: paths;
  icon?: () => JSX.Element;
  title: string;
  active: boolean;
};


export type TPaginationOptions = {
  size?: number;
  page?: number;
}

export interface FormikFieldProps {
  name: string
  validate?: (value: any) => undefined | string | Promise<any>
  fast?: boolean
}

export enum EAppNames  {
  bitnalog= "bitnalog",
  bitOk= "bitOk",
}

export enum ECurrency {
  usd = "USD",
  rub = "RUB"
}
