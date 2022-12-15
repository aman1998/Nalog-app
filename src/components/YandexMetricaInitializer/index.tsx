import ym, { YMInitializer } from "react-yandex-metrika";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const YandexMetricaInitializer: FC = () =>{
  const location = useLocation();

  useEffect(() => {
    if (location.pathname && process.env.REACT_APP_YM_CODE) {
      ym('hit', location.pathname, {
        title: document.title
      });
    }
  }, [location.pathname]);
  
  if (!process.env.REACT_APP_YM_CODE) {
    return null;
  }
  
  return <YMInitializer
    accounts={[Number(process.env.REACT_APP_YM_CODE)]}
    options={{
      defer: true,
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    }}
    version="2"
  />;};

export default YandexMetricaInitializer;