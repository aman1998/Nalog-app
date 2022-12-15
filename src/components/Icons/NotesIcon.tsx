import { colors } from "config/constants";

{/* eslint-disable max-len */}
const NotesIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.5" fill={colors.gray4} stroke={colors.gray4}/>
    <path d="M4.5 5.99951H13.5V6.92259H4.5V5.99951ZM4.5 8.53797H13.5V9.46105H4.5V8.53797ZM4.5 11.0764H9.25V11.9995H4.5V11.0764Z" fill={colors.main}/>
  </svg>
);

export default NotesIcon;
