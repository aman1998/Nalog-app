import { getTextWidth } from "utils/text";

import { NOTE_TRUNCATE_COUNT } from "./constants";

const NOTE_LINE_WIDTH = 168;

export const checkNoteTextTruncate = (text: string): [boolean, boolean, number] => {
  const cyrillicPattern = /[\u0400-\u04FF]/;
  const isCyrillic = cyrillicPattern.test(text);
  const nextLine = getTextWidth(text, "400 12px Roboto,sans-serif") > NOTE_LINE_WIDTH;

  if (isCyrillic) {
    const cyrillicTruncateCount = NOTE_TRUNCATE_COUNT - 8;
    return [nextLine, text.length > cyrillicTruncateCount, cyrillicTruncateCount];
  }
  return [nextLine, text.length > NOTE_TRUNCATE_COUNT, NOTE_TRUNCATE_COUNT];
};
