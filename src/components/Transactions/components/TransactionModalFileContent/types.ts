
export type TTransactionModalFileContentProps = {
  id?: string;
  setDeleteFiles?: (prev: (prev: string[]) => string[]) => void,
  files: File[]
}