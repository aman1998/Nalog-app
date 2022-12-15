import { FC } from 'react';
import { useDispatch } from "react-redux";

import TelegramIcon from "components/Icons/TelegramIcon";

import { signInOAuthRequest, signUpOAuthRequest } from "store/auth/reducers";
import { TOAuthProvider } from "store/auth/types";

import { showError } from "utils/notifications";

import { TIsSignIn } from "../../types";

type TTelegramUser = {
  auth_date: number;
  first_name: string;
  hash: string;
  id: number;
  last_name: string;
  username: string
}

interface Telegram {
  Login: {
    auth: (options: any, callback: any) => void;
  }
}

declare global {
  interface Window {
    Telegram?: Telegram
  }
}

const AuthTelegram: FC<TIsSignIn> = ({ isSignIn }) => {
  const dispatch = useDispatch();

  if (!process.env.REACT_APP_TELEGRAM_BOT_ID) {
    return <></>;
  }

  const onClickTelegramIcon = () => {
    if (window.Telegram) {
      window.Telegram.Login.auth(
        {
          bot_id: process.env.REACT_APP_TELEGRAM_BOT_ID,
          request_access: true,
          auth_url: "/auth/oauth/callback/"
        },
        (user: TTelegramUser) => {
          if (!user) {
            showError("Cannot authorize telegram.");
          }

          if (isSignIn) {
            dispatch(signInOAuthRequest({ auth_data: user, provider: TOAuthProvider.telegram }));
          } else {
            dispatch(signUpOAuthRequest({ auth_data: user, provider: TOAuthProvider.telegram }));
          }
        }
      );
    }
  };

  return (
    <div className="item sign-icon--tg" onClick={onClickTelegramIcon}>
      <div>
        <TelegramIcon />
      </div>
      <span>Telegram</span>
    </div>
  );
};

export default AuthTelegram;