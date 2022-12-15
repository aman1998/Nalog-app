import { colors } from "config/constants";

{/* eslint-disable max-len */}
const DangerIcon = ({ fill = colors.red6 }: { fill?: string }): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path
        d="M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM8 14.6429C4.33214 14.6429 1.35714 11.6679 1.35714 8C1.35714 4.33214 4.33214 1.35714 8 1.35714C11.6679 1.35714 14.6429 4.33214 14.6429 8C14.6429 11.6679 11.6679 14.6429 8 14.6429Z"
        fill={fill}
      />
      <path
        d="M7.14258 11.1429C7.14258 11.3702 7.23288 11.5882 7.39363 11.7489C7.55437 11.9097 7.77239 12 7.99972 12C8.22705 12 8.44507 11.9097 8.60581 11.7489C8.76656 11.5882 8.85686 11.3702 8.85686 11.1429C8.85686 10.9155 8.76656 10.6975 8.60581 10.5368C8.44507 10.376 8.22705 10.2857 7.99972 10.2857C7.77239 10.2857 7.55437 10.376 7.39363 10.5368C7.23288 10.6975 7.14258 10.9155 7.14258 11.1429ZM7.57115 9.14286H8.42829C8.50686 9.14286 8.57115 9.07857 8.57115 9V4.14286C8.57115 4.06429 8.50686 4 8.42829 4H7.57115C7.49258 4 7.42829 4.06429 7.42829 4.14286V9C7.42829 9.07857 7.49258 9.14286 7.57115 9.14286Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default DangerIcon;