
const UTM = "utm_";
export const getOnlyUtm = (query: URLSearchParams): string => {
  query.forEach((_, key) => {
    if (key.slice(0, UTM.length) !== UTM) {
      query.delete(key);
    }
  });
  return "?" + query.toString();
};