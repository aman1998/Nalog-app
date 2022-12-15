import { FC } from "react";

const AuthCarouselSlider1: FC = () => (
  <div className="auth-carousel__slider-3">

    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-3/black-group.png"}
      className="auth-carousel__slider-3__black-group"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-3/red-group.png"}
      className="auth-carousel__slider-3__red-group"
    />

    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-3/green-group.png"}
      className="auth-carousel__slider-3__green-group"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-3/risk-score.png"}
      className="auth-carousel__slider-3__risk-score"
    />

  </div>
);

export default AuthCarouselSlider1;