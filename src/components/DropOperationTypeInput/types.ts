import { TSingleTransactionFilesListData } from "store/transactions/types";

export type DropOperationTypeInputProps = {
  value: TSingleTransactionFilesListData;
  setValue?: (value: any) => void;
  onRemoveFile?: (value: any) => void;
  onFileAdd?: (value: any) => void;
  docType?: string;
  description?: string;
  disabled?: boolean;
}