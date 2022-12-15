export const filterListBySearch =
  <T>(list: T[] | undefined | null, searchValue: string|undefined, searchKey: keyof T): T[] => {
    if (!list) return [];
    return list?.filter((item: T) => {
      const val = item[searchKey];
      return (
        !searchValue ||
      (item && searchKey && typeof val === "string" && val.toLowerCase().includes(searchValue.toLowerCase()))
      );
    });
  };
