
const animateScrollTo = (to: number, duration: number): void => {
  const element = document.scrollingElement || document.documentElement;
  if (!element) {
    window.scrollTo({
      top: to,
      behavior: "smooth",
    });
  }
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();
  // t = current time
  // s = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t: number, s: number, c: number, d: number) => {
    let t2 = t;
    t2 /= d / 2;
    if (t2 < 1) return (c / 2) * t2 * t2 + s;
    t2 -= 1;
    return (-c / 2) * (t2 * (t2 - 2) - 1) + s;
  };
  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

export default animateScrollTo;