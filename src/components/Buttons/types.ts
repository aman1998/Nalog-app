import { ButtonProps } from "antd/lib/button/button";

export interface IButtonFilter
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isActive: boolean;
}

export interface IButton extends ButtonProps {
  lettuce?: boolean;
  pink?: boolean;
  transparent?: boolean;
}