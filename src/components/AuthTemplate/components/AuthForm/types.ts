import { TIsSignIn } from "../../types";

export type IAuthForm = {
  setUsername: (value: string) => void;
} & TIsSignIn

export type AuthFormValues = {
  username: string;
  password: string;
}