import { ECurrency } from "config/types";
import { colors } from "config/constants";

import { TValueByAccountData, TValueByAssetElement } from "./types";

export const fakeValueByAccountData: TValueByAccountData = {
  "count": 26,
  currency: ECurrency.rub,
  "accounts": [
    {
      "id": "6a2ef160-8057-460f-bcc4-95f930dc3f3f",
      "name": "Binance",
      "value": "790528.82"
    },
    {
      "id": "caf7302e-5de7-4528-9b0f-07be8ca11d22",
      "name": "EXMO",
      "value": "790528.82"
    },
    {
      "id": "7215fec4-180a-4067-afd0-339e76cdce93",
      "name": "Bybit",
      "value": "790528.82"
    },
    {
      "id": "945997f6-7bd2-4f63-9952-2ed71ed0ce27",
      "name": "Huobi",
      "value": "51040.15"
    },
    {
      "id": "713be528-9789-4205-ba1c-adbf3229da61", "name": "FTX", "value": "30177.41"
    }
  ],
  "others": { "value": "66569.80" }
};

export const fakeValueByAssetData = {
  "count": 66,
  "assets": [{ "name": "USDT", "amount": "38475.493207282350000000", "value": "2162805.39" }, {
    "name": "ETH",
    "amount": "4.159024629547458000",
    "value": "264119.23"
  }, { "name": "USDC", "amount": "495.460001770000000000", "value": "27853.46" }, {
    "name": "BUSD",
    "amount": "322.951696200000100000",
    "value": "18155.50"
  }, { "name": "BTC", "amount": "0.010625322000000001", "value": "12322.75" }, {
    "name": "1INCH",
    "amount": "201.853514900000020000",
    "value": "8081.20"
  }, { "name": "PAXG", "amount": "0.039000000000000000", "value": "4046.84" }, {
    "name": "ASTR",
    "amount": "312.977719880000000000",
    "value": "848.81"
  }],
  "others": { "value": "900.52" },
  "currency": ECurrency.usd,
  "total_cost": "0"
};

export const DIAGRAM_COLORS = [
  colors.main,
  colors.complementary,
  '#69E299',
  colors.gray7,
  colors.gray5 // rest
];
export const DIAGRAM_COLOR_REST = DIAGRAM_COLORS[DIAGRAM_COLORS.length-1];

export const DEFAULT_COUNT_OF_VALUE_BY_ASSETS = 5;
export const DEFAULT_VALUE_BY_ASSETS: TValueByAssetElement[] = [
  {
    name: "BTC",
    amount: "0",
    value: "0"
  },
  {
    name: "ETH",
    amount: "0",
    value: "0"
  },
  {
    name: "USDT",
    amount: "0",
    value: "0"
  },
  {
    name: "BNB",
    amount: "0",
    value: "0"
  },
  {
    name: "LTC",
    amount: "0",
    value: "0"
  },
];