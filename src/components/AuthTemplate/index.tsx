import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";

import { paths } from "config/paths";

import { openCode } from "store/auth/reducers";
import { isCodeOpen, isAuthorizedSelector } from "store/auth/selectors";
import { getUserInfoFetchingSelector } from "store/user/selectors";

import { getOnlyUtm } from "utils/getOnlyUtm";

import useQuery from "../../hooks/useQuery";
import { moreMdMedia } from "../../config/constants";

import CheckForm from "./components/AuthCheckForm";
import AuthForm from "./components/AuthForm";
import AuthHeader from "./components/AuthHeader";
import AuthFooter from "./components/AuthFooter";
import { TIsSignIn } from "./types";
import AuthCarousel from "./components/AuthCarousel";

const AuthTemplate: FC<TIsSignIn> = ({ isSignIn = true }) => {
  const [username, setUsername] = useState("");
  const loading = useSelector(getUserInfoFetchingSelector);
  const isPhoneCheckOpen = useSelector(isCodeOpen);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    if (isAuthorized) {
      history.push(paths.HOME + getOnlyUtm(query));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  useEffect(() => {
    if (location.hash) dispatch(openCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading) return <div />;

  return (
    <div className="sign-wrapper">
      <section
        className={cn("sign", {
          _signIn: isSignIn,
          _signUp: !isSignIn,
        })}
      >
        <MediaQuery minWidth={moreMdMedia}>
          <AuthCarousel />
        </MediaQuery>
        <div className="sign-form_extra_wrapper">
          <div
            className={cn("sign-form_wrapper", {
              _isPhoneCheckForm: isPhoneCheckOpen,
            })}
          >
            {!isPhoneCheckOpen ? (
              <>
                <AuthHeader isSignIn={isSignIn} />
                <AuthForm isSignIn={isSignIn} setUsername={setUsername} />
                <AuthFooter isSignIn={isSignIn} />
              </>
            ) : (
              <CheckForm username={username} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthTemplate;
