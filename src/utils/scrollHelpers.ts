export const getScrollPosition = (): number =>
  window.scrollY || document.documentElement.scrollTop;

export const getScrollTop = (): number =>
  (document.scrollingElement || document.documentElement).scrollTop;

export const getScrollBottom = (): number =>
  Math.abs(
    window.innerHeight + getScrollPosition() - document.body.scrollHeight
  );

export const getScrollPercentage = (): number => {
  const scrollPosition = getScrollPosition();
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollTop = scrollPosition / scrollHeight || 0;

  return scrollTop * 100;
};
