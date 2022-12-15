import { FC } from 'react';

import SettingIcon from "components/Icons/SettingIcon";

const PricingCardActiveMarker: FC = () => (
  <div className="pricing__card__active-marker">
    <span>Active</span>
    <SettingIcon/>
  </div>
);

export default PricingCardActiveMarker;