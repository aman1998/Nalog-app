export const purposeFieldUpdated = (
  files: File[],
): boolean => !!files.filter(f => f instanceof File).length;