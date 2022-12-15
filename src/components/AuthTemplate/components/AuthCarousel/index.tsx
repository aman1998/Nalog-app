import { FC, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux";

import { EAppNames } from "config/types";

import { useLayoutAppNameContext } from "components/Layout/hooks";

import { setAuthCarousel } from 'store/common/reducers';
import { authCarouseSelector } from "store/common/selectors";

import AuthCarouselSlider1 from './components/AuthCarouselSlider1';
import AuthCarouselSlider2 from './components/AuthCarouselSlider2';
import AuthCarouselSlider3 from './components/AuthCarouselSlider3';

const sliders = [
  {
    label:   "authCarousel.label1",
    component: <AuthCarouselSlider1/>
  },
  {
    label:   "authCarousel.label2",
    component: <AuthCarouselSlider2/>
  },
  {
    label:   "authCarousel.label3",
    component: <AuthCarouselSlider3/>
  }
];

const CAROUSEL_INTERVAL = 10000;

const AuthCarousel: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sliderController = useRef(0);
  const { selected } = useSelector(authCarouseSelector);
  const { logo }= useLayoutAppNameContext();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setAuthCarousel((selected + 1) % sliders.length));
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [sliderController.current]);

  return (<div className="auth-carousel__wrapper">
    <div className="auth-carousel__content">
      <div className={cn("auth-carousel__content__logo", { bitOk: process.env.REACT_APP_NAME === EAppNames.bitOk })}>
        {logo}
      </div>
      <div className="auth-carousel__content__text">
        {t("authCheckForm.text")}
      </div>
      <div className="auth-carousel__content__slider-control">
        {sliders.map(({ label }, index) => (
          <div
            key={index}
            onClick={() => {
              sliderController.current += 1;
              dispatch(setAuthCarousel(index));}
            }
            className={cn("auth-carousel__content__slider-control__item", { active: index === selected })}
          >
            {t(label)}
          </div>
        ))}
      </div>
    </div>
    <div className="auth-carousel">
      <TransitionGroup>
        <CSSTransition
          key={selected}
          classNames="auth-carousel__transition"
          timeout={350}
        >
          {sliders[selected].component}
        </CSSTransition>
      </TransitionGroup>
    </div>
  </div>);
};

export default AuthCarousel;