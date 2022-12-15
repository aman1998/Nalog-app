export type TListProps<T> = {
  component: JSX.Element;
  loading: boolean;
  preloader: JSX.Element;
  emptyText?: JSX.Element;
  data?: T[] | null;
};
