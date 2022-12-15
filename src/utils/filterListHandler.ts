import { TFilterData } from "../config/types";

export function filterListHandler (data: TFilterData[] | null | undefined, label?: string): TFilterData[] {
  const filterData: TFilterData[] = [];
  if (data && data.length) {
    data.forEach((item: TFilterData) => {
      filterData.push(item);
    });
  }
  if (label) filterData.unshift({ value: '', label });
  return filterData;
}
