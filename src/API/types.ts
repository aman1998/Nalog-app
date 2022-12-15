import { AxiosError } from "axios";

export type TParsedError = Record<string, string|string[]| [Record<string, string| string[]>]> | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AxiosDataError<T = any> extends AxiosError<T> {
  parsedErrors: any;
}
