import { ELinks, TLinks } from "config/types";
import { paths } from "config/paths";

import SafetyIcon from "components/Icons/SafetyIcon";
import CompassIcon from "components/Icons/CompassIcon";
import RocketIcon from "components/Icons/RocketIcon";
import PushpinIcon from "components/Icons/PushpinIcon";

export const SETTINGS_LINKS: TLinks[] = [
  { id: 1, to: paths.SETTINGS, icon: CompassIcon, title: ELinks.SETTINGS_MAIN, active: true  },
  { id: 2, to: paths.SETTINGS_SAFETY, icon: SafetyIcon, title: ELinks.SETTINGS_SAFETY, active: true  },
  {
    id: 3,
    to: paths.SETTINGS_SERVICES,
    icon: PushpinIcon,
    title: ELinks.SETTINGS_SERVICES,
    active: process.env.REACT_APP_SERVICES_DISABLED !== "true"
  },
  {
    id: 4,
    to: paths.SETTINGS_PLAN_AND_PAYMENTS,
    icon: RocketIcon,
    title: ELinks.SETTINGS_PLAN_AND_PAYMENT,
    active: true
  },
];