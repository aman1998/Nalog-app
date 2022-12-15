import cn from "classnames";
import { FC, MouseEventHandler } from "react";

export type HeaderBurgerProps = {
  active: boolean;
  onClick: MouseEventHandler<HTMLDivElement>
}

const HeaderBurger: FC<HeaderBurgerProps> = ({ active, onClick }) => <div
  className={cn("header-hamburger", {
    _isHamburgerActive: active,
  })}
  onClick={onClick}
>
  <span className="header-hamburger_line line--top" />
  <span className="header-hamburger_line line--center" />
  <span className="header-hamburger_line line--bottom" />
</div>;

export default HeaderBurger;