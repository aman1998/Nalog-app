import { ACTIONS, TAction, TLocalState } from "./types";

export function reducer(state: TLocalState, action: TAction): TLocalState {
  switch (action.type) {
  case ACTIONS.SET_DATE_RANGE:
    return {
      ...state,
      fixedDate: null,
      dateRange: action.payload
    };
  case ACTIONS.SET_FIXED_DATE:
    return {
      ...state,
      dateRange: null,
      fixedDate: action.payload
    };
  default:
    return state;
  }
}