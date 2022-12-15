import { FC } from 'react';

import { colors } from "config/constants";

{/* eslint-disable max-len */}

const XmlIcon: FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_4996_55276)">
      <path d="M14 4C12.9 4 12 4.9 12 6V34C12 35.1 12.9 36 14 36H34C35.1 36 36 35.1 36 34V12L28 4H14Z" fill={colors.gray3}/>
    </g>
    <path d="M29 12H35L27 4V10C27 11.1 27.9 12 29 12Z" fill="#B0B7BD"/>
    <path d="M28 26C28 26.55 27.55 27 27 27H5C4.45 27 4 26.55 4 26V16C4 15.45 4.45 15 5 15H27C27.55 15 28 15.45 28 16V26Z" fill="#50BEE8"/>
    <path d="M27 27H8V28H27C27.55 28 28 27.55 28 27V26C28 26.55 27.55 27 27 27Z" fill="#CAD1D8"/>
    <path d="M9.13672 18.3125L10.3438 20.3867L11.5508 18.3125H12.6797L10.9609 21.1289L12.7227 24H11.582L10.3438 21.8867L9.10547 24H7.96094L9.72656 21.1289L8.00391 18.3125H9.13672ZM13.8438 18.3125H14.7188L16.3633 22.6992L18.0039 18.3125H18.8789L16.707 24H16.0117L13.8438 18.3125ZM13.4453 18.3125H14.2773L14.4219 22.1094V24H13.4453V18.3125ZM18.4453 18.3125H19.2812V24H18.3008V22.1094L18.4453 18.3125ZM24.0078 23.2227V24H21.1523V23.2227H24.0078ZM21.4258 18.3125V24H20.4453V18.3125H21.4258Z" fill={colors.gray3}/>
    <defs>
      <filter id="filter0_d_4996_55276" x="10" y="4" width="28" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4996_55276"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4996_55276" result="shape"/>
      </filter>
    </defs>
  </svg>

);

export default XmlIcon;
