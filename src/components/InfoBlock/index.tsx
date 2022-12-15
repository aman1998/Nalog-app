import { FC } from "react";

import { TInfoBlockProps } from "./types";

const InfoBlock: FC<TInfoBlockProps> = ({ children, title, icon, className }) => (
  <article className={`info-block info-block--${className}`}>
    <div className="info-block__line" />
    <div className="info-block__content">
      <div className="info-block__header">
        <div className="info-block__icon-wrapper">
          <img src={icon} className="info-block__icon" />
        </div>
        <div className="info-block__title">{title}</div>
      </div>
      <div className="info-block__text-wrapper">
        {children}
      </div>
    </div>
  </article>
);

export default InfoBlock;
