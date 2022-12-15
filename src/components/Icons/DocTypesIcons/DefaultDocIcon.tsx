import { FC } from 'react';

import { colors } from "config/constants";

{/* eslint-disable max-len */}
const DefaultDocIcon:FC = ():JSX.Element => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_5225_53967)">
      <path d="M14 4C12.9 4 12 4.9 12 6V34C12 35.1 12.9 36 14 36H34C35.1 36 36 35.1 36 34V12L28 4H14Z" fill={colors.gray3}/>
    </g>
    <path d="M29 12H35L27 4V10C27 11.1 27.9 12 29 12Z" fill="#B0B7BD"/>
    <path d="M28 26C28 26.55 27.55 27 27 27H5C4.45 27 4 26.55 4 26V16C4 15.45 4.45 15 5 15H27C27.55 15 28 15.45 28 16V26Z" fill="white"/>
    <path d="M27 27H8V28H27C27.55 28 28 27.55 28 27V26C28 26.55 27.55 27 27 27Z" fill="#CAD1D8"/>
    <defs>
      <filter id="filter0_d_5225_53967" x="10" y="4" width="28" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5225_53967"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5225_53967" result="shape"/>
      </filter>
    </defs>
  </svg>
);

export default DefaultDocIcon;
