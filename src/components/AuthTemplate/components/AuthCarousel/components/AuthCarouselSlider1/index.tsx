import { FC } from "react";

const AuthCarouselSlider1: FC = () => (
  <div className="auth-carousel__slider-1">
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-1/blue-polygon.png"}
      className="auth-carousel__slider-1__blue-polygon"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-1/red-group.png"}
      className="auth-carousel__slider-1__red-group"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-1/dashboard.png"}
      className="auth-carousel__slider-1__dashboard"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-1/green-vector.png"}
      className="auth-carousel__slider-1__green-vector"
    />
  </div>
);

export default AuthCarouselSlider1;