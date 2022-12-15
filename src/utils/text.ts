export const truncateAmidstDots = (value?: string): string => {
  if (!value) return "";
  return value.substring(0, 4).concat("...") + value.substring(value.length - 4, value.length);
};

export const replaceCommaToDot = (value: string | number): number => Number(value.toString().replaceAll(",", "."));

export const replaceDotToComma = (value: string | number): string => value.toString().replaceAll(".", ",");


/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export const getTextWidth = (text: string, font: string): number => {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font;
  }

  const metrics = context?.measureText(text);
  return metrics?.width || 0;
};

// console.log(getTextWidth("hello there!", "bold 12pt arial"));  // close to 86