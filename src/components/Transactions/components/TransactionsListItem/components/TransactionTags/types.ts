import { TNullable } from "config/types";

export type TransactionTagsProps = {
  id: string;
  tags: {name: string}[];
  note: TNullable<string>
}