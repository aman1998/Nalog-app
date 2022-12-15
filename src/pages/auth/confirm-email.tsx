import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { paths } from "config/paths";

import { confirmEmailFailureSelector, confirmEmailFetchingSelector, isAuthorizedSelector } from "store/auth/selectors";
import { confirmEmailRequest } from "store/auth/reducers";

import { showError } from "utils/notifications";

const EmailConfirmPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(confirmEmailFailureSelector);
  const loading = useSelector(confirmEmailFetchingSelector);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const isAuthorized = useSelector(isAuthorizedSelector);

  const redirect = () => {
    if (isAuthorized) {
      history.push(paths.HOME);
    } else {
      history.push(paths.SIGN_IN);
    }
  };

  useEffect(() => {
    if (!loading) {
      dispatch(confirmEmailRequest({ data: { code_token: token, code }, callback: redirect }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errors?.parsedErrors) {
      for (const key of Object.keys(errors?.parsedErrors)) {
        showError(errors?.parsedErrors[key]);
      }
    }
  }, [errors]);

  return <div>Email confirm</div>;
};

export default EmailConfirmPage;
