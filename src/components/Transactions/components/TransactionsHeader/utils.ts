
export const formTotalCount = (count: number): string => {
  if (count > 0) {
    return count.toString();
  }

  if(count === 0) return '0';

  return "...";
};