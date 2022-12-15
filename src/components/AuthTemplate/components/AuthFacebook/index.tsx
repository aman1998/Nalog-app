import { FC } from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { useDispatch } from "react-redux";

import FacebooKIcon from 'components/Icons/FacebookIcon';

import { signInOAuthRequest, signUpOAuthRequest } from "store/auth/reducers";
import { TOAuthProvider } from "store/auth/types";

import { TIsSignIn } from "../../types";

const AuthFacebook: FC<TIsSignIn> = ({ isSignIn }) => {
  const dispatch = useDispatch();

  if (!process.env.REACT_APP_FACEBOOK_APP_ID) {
    return <></>;
  }

  const responseFacebook = (userInfo: ReactFacebookLoginInfo) => {
    if (!userInfo.accessToken) {
      return;
    }

    if (isSignIn) {
      dispatch(signInOAuthRequest({
        provider: TOAuthProvider.facebook,
        code: userInfo.accessToken
      }));
    } else {
      dispatch(signUpOAuthRequest({
        provider: TOAuthProvider.facebook,
        code: userInfo.accessToken
      }));
    }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      scope="public_profile,email"
      fields="id,name,email"
      callback={responseFacebook}
      render={renderProps => (
        <div className="item" onClick={renderProps.onClick}>
          <div>
            <FacebooKIcon />
          </div>
          <span>Facebook</span>
        </div>
      )}
      responseType={'code'}
    />
  );
};

export default AuthFacebook;