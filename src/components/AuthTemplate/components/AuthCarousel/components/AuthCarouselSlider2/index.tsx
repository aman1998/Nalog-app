import { FC } from "react";

const AuthCarouselSlider1: FC = () => ( 
  <div className="auth-carousel__slider-2">
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-2/green-group.png"}
      className="auth-carousel__slider-2__green-group"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-2/black-group.png"}
      className="auth-carousel__slider-2__black-group"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-2/documents.png"}
      className="auth-carousel__slider-2__document"
    />
    <img
      src={process.env.PUBLIC_URL + "/img/auth-slider-2/blue-vector.png"}
      className="auth-carousel__slider-2__blue-vector"
    />
  </div>
);

export default AuthCarouselSlider1;