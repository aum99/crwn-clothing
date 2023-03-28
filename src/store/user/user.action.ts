import { User } from "firebase/auth";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utlis/reducer/reducer.utils";
import { USER_STATE_TYPES } from "./user.types";
import {
  UserData,
  AdditionalInformation,
} from "../../utlis/firebase/firebase.utlis";

export type CheckUserSession = Action<USER_STATE_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_STATE_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
  USER_STATE_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_STATE_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailed = ActionWithPayload<
  USER_STATE_TYPES.SIGN_IN_FAILED,
  Error
>;

export type SignUpStart = ActionWithPayload<
  USER_STATE_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
  USER_STATE_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }
>;

export type SignUpFailed = ActionWithPayload<
  USER_STATE_TYPES.SIGN_UP_FAILED,
  Error
>;

export type SignOutStart = Action<USER_STATE_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_STATE_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
  USER_STATE_TYPES.SIGN_OUT_FAILED,
  Error
>;

// CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_STATE_TYPES.CHECK_USER_SESSION)
);

// GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_STATE_TYPES.GOOGLE_SIGN_IN_START)
);

// EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_STATE_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

// SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_STATE_TYPES.SIGN_IN_SUCCESS, user)
);

// SIGN_IN_FAILED: "user/SIGN_IN_FAILED",
export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_STATE_TYPES.SIGN_IN_FAILED, error)
);

// SIGN_UP_START: "user/SIGN_UP_START",
export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_STATE_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

// SIGN_UP_SUCCESS: "user/SIGN_UP_SUCCESS",
export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
    createAction(USER_STATE_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

// SIGN_UP_FAILED: "user/SIGN_UP_FAILED",

export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_STATE_TYPES.SIGN_UP_FAILED, error)
);

// SIGN_OUT_START: "user/SIGN_OUT_START",
export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_STATE_TYPES.SIGN_OUT_START)
);

// SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_STATE_TYPES.SIGN_OUT_SUCCESS)
);

// SIGN_OUT_FAILED: "user/SIGN_OUT_FAILED",
export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_STATE_TYPES.SIGN_OUT_FAILED, error)
);
