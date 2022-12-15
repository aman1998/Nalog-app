import { TNullable } from "../config/types";

export type useScrollDirectionProps = () => [number, EScrollDirection]

export type TScrollEventTypes = {
  finish: boolean,
  fetching: boolean,
  fetchList: () => void,
};

export enum EScrollDirection {
  up = 'scrolling up',
  down = 'scrolling down'
}

export type useWindowDimensionsState = {
  width: TNullable<number> ;
  height: TNullable<number>;
}
