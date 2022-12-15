import { FC } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";

import GoogleIcon from "components/Icons/GoogleIcon";

import { signInOAuthRequest, signUpOAuthRequest } from "store/auth/reducers";
import { TOAuthProvider } from "store/auth/types";

import { TIsSignIn } from "../../types";

const { REACT_APP_REDIRECT_URI } = process.env;

const AuthGoogle: FC<TIsSignIn> = ({ isSignIn }) =>{
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      if (isSignIn) {
        dispatch(signInOAuthRequest({
          provider: TOAuthProvider.googleOauth2,
          code: tokenResponse.code,
        }));
      } else {
        dispatch(signUpOAuthRequest({ code: tokenResponse.code,provider: TOAuthProvider.googleOauth2 }));
      }
    },
    flow: 'auth-code',
    redirect_uri: REACT_APP_REDIRECT_URI,
  });

  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    return <></>;
  }

  return (
    <div className="item" onClick={() => login()} >
      <div>
        <GoogleIcon />
      </div>
      <span>Google</span>
    </div>
  );
};

export default AuthGoogle;