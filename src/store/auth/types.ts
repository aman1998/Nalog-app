import { TNullable } from "config/types";

import { TRequestHandler } from "../rootInterface";

export const defaultResetPasswordState = {
  showUsername: true,
  showCode: false,
  showNewPassword: false,
};

export interface ISignInData {
  token: string;
  result: string;
  error_code: string;
}

export type TSignInState = TRequestHandler<ISignInData>

export type TResetPassword = {
  showUsername: boolean;
  showCode: boolean;
  showNewPassword: boolean;
};

export type TSignUpData = {
  refresh_token: string;
  access_token: string;
};

export type TSignUpState = TRequestHandler<TSignUpData>

export type TResendCodeRequest = {
  code_token: string;
  isReset: boolean;
};

export type TResetCodeData = {
  reset_token: string;
};

export type TResetCodeState = TRequestHandler<TResetCodeData>

export type TConfirmEmailProps = {
  code_token: string;
  code: number;
};

export type TConfirmEmailRequest = {
  data: TConfirmEmailProps;
  callback: () => void;
};

export type TConfirmEmailData = {
  detail: string;
};

export type TConfirmEmailState = TRequestHandler<TConfirmEmailData>

export type TelegramAuth = {
  auth_date: number,
  first_name: string,
  hash: string,
  id: number,
  last_name: string,
  username: string
}


export enum TOAuthProvider {
  telegram="telegram",
  googleOauth2="google-oauth2",
  googlePlus="google-plus",
  facebook="facebook"
}
export type TTSignOAuthOptions = {
  auth_data: TelegramAuth
  provider: TOAuthProvider
  code: string
}

export type TSignUpOAuthState = TRequestHandler<TSignUpData>
export type TSignInOAuthState = TRequestHandler<TSignUpData>

export type TAuthStoreState = {
  isCodeOpen: boolean;
  isAuthorized: boolean;
  signInState: TSignInState;
  signUpPhoneState: TSignUpState;
  signUpEmailState: TSignUpState;
  codeConfirmState: TSignUpState;
  profileInfoState: TSignUpState;
  resetUsernameState: TSignUpState;
  resetCodeState: TResetCodeState;
  resetNewPasswordState: TSignUpState;
  resendCodeState: TSignUpState;
  confirmEmailState: TConfirmEmailState;
  blockingTime: TNullable<string>;
  codeToken: TNullable<string>;
  resetPassword: TResetPassword;
  signUpOAuthState: TSignUpOAuthState;
  signInOAuthState: TSignInOAuthState;
};

export type TAuthRequest = {
  email: string;
  password: string;
  recaptcha: string;
};

export type TAuthAction = {
  payload: TAuthRequest;
};
