import { FC } from 'react';

import StepTwoFilter from "../StepTwoFilter";
import StepTwoFilterCounter from "../StepTwoFilter/components/StepTwoFilterCounter";

const StepTwoDesktopHeader: FC = () => <>
  <div className="create-document__step-two__filter__wrapper"/>
  <StepTwoFilter/>
  <StepTwoFilterCounter/>
</>;

export default StepTwoDesktopHeader;