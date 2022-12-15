import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { maxMobileMediaWidth } from "config/constants";

import CloseIcon from "components/Icons/CloseIcon";

import PopUpPortal from "./components/PopUpPortal";

export type PopUpProps = {
  title: string;
  text: string;
  relatedTo: string;
  setVisible: () => void;
}

const PopUp: FC<PopUpProps> = ({ title, text, setVisible, relatedTo }) => {
  const [related, setRelated] = useState<Element|null>(null);
  const relatedElements = document.getElementsByClassName(relatedTo);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  
  useEffect(() => {
    if (relatedElements.length > 0) {
      setTimeout(() =>  {
        setRelated(relatedElements[0]);
      }, 300);
    }
  }, [relatedElements]);

  const left = isMobile
    ? related?.getBoundingClientRect().left && related?.getBoundingClientRect().left - 16
    : related?.getBoundingClientRect().right && related?.getBoundingClientRect().right + 16;
  const top = isMobile
    ? related?.getBoundingClientRect().top && related?.getBoundingClientRect().top - 48
    : related?.getBoundingClientRect().top && related?.getBoundingClientRect().top + 100;
  const width = isMobile
    ? related?.getBoundingClientRect().width && related?.getBoundingClientRect().width
    : 369;

  const styles = {
    top,
    left,
    width
  };

  return (
    <PopUpPortal>
      <div className="pop-up" style={styles}>
        <div className="pop-up__body" style={{ width }}>
          {!isMobile && <div className="pop-up__close" onClick={setVisible}>
            <CloseIcon />
          </div>}
          <div
            className="pop-up__content"
            style={{ maxWidth: related?.getBoundingClientRect().width && related?.getBoundingClientRect().width }}
          >
            {!isMobile && <h4  className="pop-up__title">{title}</h4>}
            <div className="pop-up__text">{text}</div>
          </div>
        </div>
      </div>
    </PopUpPortal>
  );};

export default PopUp;