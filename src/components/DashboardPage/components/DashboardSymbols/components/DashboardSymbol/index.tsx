import { useMediaQuery } from "react-responsive";
import { FC, memo, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";

import { maxMobileMediaWidth } from "config/constants";

import CryptoIcon from "components/CryptoIcon";
import BinanceWhiteIcon from "components/Icons/BinanceWhiteIcon";

import { TAssetsDashboardSymbols } from "store/assets/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { currencyFormat } from "utils/fractions";

const DashboardSymbol: FC<TAssetsDashboardSymbols> = memo(({
  icon, name, price, change, source, type
}): JSX.Element => {
  const dispatch = useDispatch();
  const [symbolWidth, setSymbolWidth] = useState(180);
  const dahsboardSymbolRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  const isPositive = change && change >= 0;

  const handleMouseEnter = () => {
    dispatch(analyticEvent(EEventType.DASHBOARD_SYMBOLS_HOVER));
  };

  useEffect(() => {
    if (dahsboardSymbolRef.current) {
      setSymbolWidth(dahsboardSymbolRef.current.offsetWidth + 56);
    }
  }, [dahsboardSymbolRef.current]);

  return (
    <div className="dashboard-symbol" onMouseEnter={handleMouseEnter}>
      {!isMobile && <div className="dashboard-symbol__icon">
        <CryptoIcon asset={icon} />
      </div>}
      <div className="dashboard-symbol__content" ref={dahsboardSymbolRef}>
        <div className="dashboard-symbol__symbol">
          {`${icon}/${name.replace(icon, "")}`}
          {!isMobile && <div className="dashboard-symbol__source-icon">
            <BinanceWhiteIcon />
          </div>}
        </div>
        <div className="dashboard-symbol__course">
          <span className={cn("dashboard-symbol__price",
            { positive: isPositive && isMobile, negative: !isPositive && isMobile })}>
            {price ? currencyFormat(Number(price)) : "0,00"}
          </span>
          {!isMobile && change && <span className={cn("dashboard-symbol__change", { negative: !isPositive })}>
            {isPositive ? "+ " : "- "}
            {currencyFormat(Number(change)).replace("-", "")} %
          </span>}
        </div>
      </div>
      {!isMobile && <div className="dashboard-symbol__source"
        style={{ width: symbolWidth }}>
        {source}, {type}
      </div>}
    </div>
  );
});

export default DashboardSymbol;