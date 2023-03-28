import { all, call, takeLatest, put } from "typed-redux-saga/macro";
import { User } from "firebase/auth";
import { USER_STATE_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithUserAndPassword,
  createAuthWithUserAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utlis/firebase/firebase.utlis";

export function* getSnapShotFromAuth(
  userAuth: User,
  additionalInformation?: AdditionalInformation
) {
  try {
    const userSnapShot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    if (userSnapShot) {
      yield* put(
        signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
      );
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (err) {
    yield* put(signOutFailed(err as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapShotFromAuth, user, additionalDetails);
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredentials = yield* call(
      createAuthWithUserAndPassword,
      email,
      password
    );
    if (userCredentials) {
      const { user } = userCredentials;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (err) {
    yield* put(signUpFailed(err as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredentials = yield* call(
      signInAuthWithUserAndPassword,
      email,
      password
    );
    if (userCredentials) {
      const { user } = userCredentials;
      yield* call(getSnapShotFromAuth, user);
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromAuth, user);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield* call(getCurrentUser);
    if (!user) return;
    yield* call(getSnapShotFromAuth, user);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* onSignOutStart() {
  yield* takeLatest(USER_STATE_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_STATE_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_STATE_TYPES.SIGN_UP_START, signUp);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_STATE_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  //1-> respond to what call , 2->what you want to actually happen
  yield* takeLatest(USER_STATE_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_STATE_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
