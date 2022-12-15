import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";

import { mobileMediaWidth } from "config/constants";

import { getAssetsDashboardSymbolRequest } from "store/assets/reducers";
import { assetsDashboardSymbolsSelector } from "store/assets/selectors";

import DashboardSymbol from "./components/DashboardSymbol";
import DashboardSymbolsSetSequenceModal from "./components/DashboardSymbolsSetSequenceModal";
import DashboardSymbolsSettingsIcon from "./components/DashboardSymbolsSettingsIcon";

const DashboardSymbols = (): JSX.Element => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });
  const { data } = useSelector(assetsDashboardSymbolsSelector);
  const symbols = data?.length ? [...data, ...new Array(5 - data?.length)] : [];

  useEffect(() => {
    dispatch(getAssetsDashboardSymbolRequest());

    const interval = setInterval(async () => {
      dispatch(getAssetsDashboardSymbolRequest());
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={cn("dashboard-symbols", { container: !isMobile })}>
    {symbols.map(symbol => symbol 
      ? <DashboardSymbol {...symbol} key={symbol.id} />
      : <div className="dashboard-symbol__empty"/>
    )}
    {!isMobile && <DashboardSymbolsSettingsIcon/>}
    {data && <DashboardSymbolsSetSequenceModal/>}
  </div>;
};

export default DashboardSymbols;