import { EStatus } from "config/types";

export interface IRecordCardHead {
  created_at: string;
  name: string;
  status: EStatus;
  id: string;
}
