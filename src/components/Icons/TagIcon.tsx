import { colors } from "config/constants";

{/* eslint-disable max-len */}
const TagIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.5" fill={colors.gray4} stroke={colors.gray4}/>
    <path d="M4.3623 12L5.74414 4.89062H6.44727L5.06055 12H4.3623ZM6.34961 12L7.73633 4.89062H8.43457L7.04785 12H6.34961ZM9.03027 7.60059H3.95215V6.92188H9.03027V7.60059ZM8.66406 9.99805H3.58105V9.32422H8.66406V9.99805ZM12.7217 4.85156V12H11.8184V5.97949L9.99707 6.64355V5.82812L12.5801 4.85156H12.7217Z" fill={colors.main}/>
  </svg>
);

export default TagIcon;
