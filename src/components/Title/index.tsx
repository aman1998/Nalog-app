import { FC } from "react";

import { ITitle } from "./type";

const Title:FC<ITitle> = ({ title, className }):JSX.Element=>(
  <h2 className={className}>
    {title}
  </h2>
);

export default Title;