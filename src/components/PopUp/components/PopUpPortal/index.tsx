import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export type PopUpPortalProps = {
  className?: string;
  el?: string;
}

const PopUpPortal: FC<PopUpPortalProps> = ({ children, className = 'pop-up-portal', el = 'div' }) => {
  const [container] = useState(() => 
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    document.createElement(el)
  );

  useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default PopUpPortal;