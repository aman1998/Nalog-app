import { TSingleTransactionFilesListData } from "store/transactions/types";

export type TFilesProps = {
  name: string;
  files: TSingleTransactionFilesListData[];
  removeFiles:(value: any) => void;
}
