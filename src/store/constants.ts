import { ECurrency } from "config/types";

export const PAGINATION_PAGE_LIMIT = 20;

export const defaultState = {
  fetching: false,
  data: null,
  failure: null,
};

export const defaultCreateDocumentState = {
  currentStep: 0,
  isAnonymous: false,
  stepOne: {
    assetsCheckList: [],
    synchronizedList: [],
    assetsList: {
      ...defaultState,
      data: []
    },
    includeManuals: true,
  }
};

export const defaultCreateTransitionExport = {
  currentStep: 1,
  stepOne: {
    assetsCheckList: null,
    synchronizedList: [],
    assetsList: {
      ...defaultState,
      data: []
    },
    includeManuals: true,
  },
  stepTwo: {
    language: null,
    date_from: null,
    date_to: null,
    types: [],
  }
};

export const defaultHintText = {
  fetching: false,
  failure: null,
  visible: false,
  hint_text: {
    title: null
  }
};

export const taxAmountReportDefault =  {
  ...defaultState,
  data: [
    {
      year: 2022,
      amount: '0',
      income: '0',
      currency: ECurrency.rub
    },
    {
      year: 2021,
      amount: '0',
      income: '0',
      currency: ECurrency.rub
    }
  ]
};