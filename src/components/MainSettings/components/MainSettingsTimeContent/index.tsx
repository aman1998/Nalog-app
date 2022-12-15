import { FC } from 'react';

import MainSettingsTimeZone from "../MainSettingsTimeZone/MainSettingsTimeZone";
import MainSettingsTimeFormats from "../MainSettingsTimeFormats";



const MainSettingsTimeContent: FC = () => (
  <div className="settings__item__content">
    <MainSettingsTimeZone className="settings__item__row"/>
    <MainSettingsTimeFormats className="settings__item__row"/>
  </div>
);

export default MainSettingsTimeContent;