import { colors } from "config/constants";

{/* eslint-disable max-len */}
const EmptyLabelIcon = (): JSX.Element => (
  <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="46" y="5" width="5" height="5" transform="rotate(-90 46 5)" fill="#AECEFF"/>
    <rect x="46" y="5" width="5" height="5" transform="rotate(-90 46 5)" fill="url(#paint0_linear_7203_74419)" fillOpacity="0.35"/>
    <rect y="46" width="5" height="5" fill="#AECEFF"/>
    <rect y="46" width="5" height="5" fill="url(#paint1_linear_7203_74419)" fillOpacity="0.35"/>
    <path d="M0 51V28.9463C0 27.8855 0.421426 26.868 1.17157 26.1179L26.1179 1.17157C26.868 0.421427 27.8855 0 28.9463 0H51L0 51Z" fill={colors.blue2}/>
    <defs>
      <linearGradient id="paint0_linear_7203_74419" x1="46" y1="7" x2="51" y2="7" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear_7203_74419" x1="5" y1="49" x2="-2.86049e-08" y2="49" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="1" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>

);

export default EmptyLabelIcon;
