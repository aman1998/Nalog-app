import { KeyboardEvent } from "react";

export const normalizeNumberType = (event: KeyboardEvent<HTMLInputElement>): void => {
  const re = /^[0-9\b]+$/;
  if (!re.test(event?.key)) event.preventDefault();
};
