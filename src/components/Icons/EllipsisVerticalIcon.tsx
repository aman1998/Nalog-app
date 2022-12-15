import { FC } from "react";

import { colors } from "config/constants";

{/* eslint-disable max-len */}
const EllipsisVerticalIcon: FC<{ color?: string }> = ({ color = colors.gray6 }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 11C19.803 11 19.608 11.0388 19.426 11.1142C19.244 11.1896 19.0786 11.3001 18.9393 11.4393C18.8001 11.5786 18.6896 11.744 18.6142 11.926C18.5388 12.108 18.5 12.303 18.5 12.5C18.5 12.697 18.5388 12.892 18.6142 13.074C18.6896 13.256 18.8001 13.4214 18.9393 13.5607C19.0786 13.6999 19.244 13.8104 19.426 13.8858C19.608 13.9612 19.803 14 20 14C20.197 14 20.392 13.9612 20.574 13.8858C20.756 13.8104 20.9214 13.6999 21.0607 13.5607C21.1999 13.4214 21.3104 13.256 21.3858 13.074C21.4612 12.892 21.5 12.697 21.5 12.5C21.5 12.303 21.4612 12.108 21.3858 11.926C21.3104 11.744 21.1999 11.5786 21.0607 11.4393C20.9214 11.3001 20.756 11.1896 20.574 11.1142C20.392 11.0388 20.197 11 20 11ZM20 18.5C19.6022 18.5 19.2206 18.658 18.9393 18.9393C18.658 19.2206 18.5 19.6022 18.5 20C18.5 20.3978 18.658 20.7794 18.9393 21.0607C19.2206 21.342 19.6022 21.5 20 21.5C20.3978 21.5 20.7794 21.342 21.0607 21.0607C21.342 20.7794 21.5 20.3978 21.5 20C21.5 19.6022 21.342 19.2206 21.0607 18.9393C20.7794 18.658 20.3978 18.5 20 18.5ZM20 26C19.6022 26 19.2206 26.158 18.9393 26.4393C18.658 26.7206 18.5 27.1022 18.5 27.5C18.5 27.8978 18.658 28.2794 18.9393 28.5607C19.2206 28.842 19.6022 29 20 29C20.3978 29 20.7794 28.842 21.0607 28.5607C21.342 28.2794 21.5 27.8978 21.5 27.5C21.5 27.1022 21.342 26.7206 21.0607 26.4393C20.7794 26.158 20.3978 26 20 26Z" fill={color}/>
  </svg>

);

export default EllipsisVerticalIcon;