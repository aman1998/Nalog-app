import { useCallback, useEffect, useState } from "react";

import { EScrollDirection, useScrollDirectionProps } from "./types";

export const useScrollDirection: useScrollDirectionProps = () => {
  let lastY = 0;
  const [scroll, setScroll] = useState<EScrollDirection>(EScrollDirection.up);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const setScrollMethod = useCallback((value: EScrollDirection) => {
    setScroll(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  useEffect(() => {
    const updateScrollDir = () => {
      const { scrollY } = window;
      setScrollMethod(window.scrollY > lastY ? EScrollDirection.down : EScrollDirection.up);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      lastY = scrollY;
    };
    window.addEventListener("scroll", updateScrollDir);
    return () => {
      window.removeEventListener("scroll", updateScrollDir);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [scrollPosition, scroll];
};


