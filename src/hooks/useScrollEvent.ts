import { useCallback, useEffect, useRef } from "react";

import { TScrollEventTypes } from "./types";

const FOOTER_HEIGHT = 148;

export const useScrollEvent = ({ fetching, finish, fetchList }: TScrollEventTypes): void => {
  const lazyLoadTimeout = useRef<NodeJS.Timeout | undefined>();

  const clearFetchTimeout = () => {
    if (lazyLoadTimeout.current) {
      clearTimeout(lazyLoadTimeout.current);
      lazyLoadTimeout.current = undefined;
    }
  };

  const handleScrollEvent = useCallback(
    () => {
      const { scrollingElement } = document;
      if (!scrollingElement) return;
      const { scrollTop, scrollHeight } = scrollingElement;
      const bottomEdge: number = scrollHeight - FOOTER_HEIGHT;
      const scrollValue: number = scrollTop + document.body.clientHeight;
      if ((scrollValue >= bottomEdge) && !fetching && !finish) {
        clearFetchTimeout();
        lazyLoadTimeout.current = setTimeout(
          () => {
            fetchList();
            lazyLoadTimeout.current = undefined;
          },
          0
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetching, finish]
  );

  useEffect(
    () => {
      window.addEventListener('scroll', handleScrollEvent);
      return () => {
        window.removeEventListener('scroll', handleScrollEvent);
      };
    },
    [handleScrollEvent],
  );
};

