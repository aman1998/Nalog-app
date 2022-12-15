
export type PaginatedItemsProps = {
  page: number;
  limit: number;
  count: number;
  disabled?: boolean;
  pageClick: (page: number) => void;
}