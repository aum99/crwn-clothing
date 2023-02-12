import { createAction } from "../../utlis/reducer/reducer.utils";
import { USER_STATE_TYPES } from "./user.types";

// CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
export const checkUserSession = () =>
  createAction(USER_STATE_TYPES.CHECK_USER_SESSION);

// GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
export const googleSignInStart = () =>
  createAction(USER_STATE_TYPES.GOOGLE_SIGN_IN_START);

// EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
export const emailSignInStart = (email, password) =>
  createAction(USER_STATE_TYPES.EMAIL_SIGN_IN_START, { email, password });

// SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
export const signInSuccess = (user) =>
  createAction(USER_STATE_TYPES.SIGN_IN_SUCCESS, user);

// SIGN_IN_FAILED: "user/SIGN_IN_FAILED",
export const signInFailed = (error) =>
  createAction(USER_STATE_TYPES.SIGN_IN_FAILED, error);

// SIGN_UP_START: "user/SIGN_UP_START",
export const signUpStart = (email, password, displayName) =>
  createAction(USER_STATE_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

// SIGN_UP_SUCCESS: "user/SIGN_UP_SUCCESS",
export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_STATE_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

// SIGN_UP_FAILED: "user/SIGN_UP_FAILED",

export const signUpFailed = (error) =>
  createAction(USER_STATE_TYPES.SIGN_UP_FAILED, error);

// SIGN_OUT_START: "user/SIGN_OUT_START",
export const signOutStart = () => createAction(USER_STATE_TYPES.SIGN_OUT_START);

// SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",

export const signOutSuccess = () =>
  createAction(USER_STATE_TYPES.SIGN_OUT_SUCCESS);

// SIGN_OUT_FAILED: "user/SIGN_OUT_FAILED",
export const signOutFailed = (error) =>
  createAction(USER_STATE_TYPES.SIGN_OUT_FAILED, error);
