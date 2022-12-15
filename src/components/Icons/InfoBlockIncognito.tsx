{/* eslint-disable max-len */}
const InfoBlockIncognito = (): JSX.Element => (
  <svg
    width="28"
    height="29"
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0 28.96H28V0.96H0V28.96Z" fill="url(#pattern0)"/>
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3183_600" transform="scale(0.015625)"/>
      </pattern>
      <image id="image0_3183_600" width="64" height="64" xlinkHref="data:image/png;base64,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"/>
    </defs>
  </svg>
);

export default InfoBlockIncognito;