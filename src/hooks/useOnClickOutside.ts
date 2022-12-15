import { RefObject } from 'react';

import useEventListener from './useEventListener';

type Handler = (event: MouseEvent) => void
type useOnClickOutsideProps<T> = {
  ref: RefObject<T>,
  handler: Handler,
  clickedRef?: RefObject<T>,
  mouseEvent?: 'mousedown' | 'mouseup'
}

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  { ref,
    handler,
    clickedRef,
    mouseEvent= 'mousedown'
  }: useOnClickOutsideProps<T>
): void {
  useEventListener(mouseEvent, event => {
    const callback = () => {
      const el = ref?.current;
      const clickedEl = clickedRef?.current;

      // Do nothing if clicking ref's element or descendent elements
      if ((!el || el.contains(event.target as Node)) || (!clickedEl || clickedEl.contains(event.target as Node))) {
        return;
      }
      handler(event);
    };

    setTimeout(() => callback(), 200);
  });
}

export default useOnClickOutside;