import { all, call, takeLatest, put } from "redux-saga/effects";

import { USER_STATE_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithUserAndPassword,
  createAuthWithUserAndPassword,
  signOutUser,
} from "../../utlis/firebase/firebase.utlis";

export function* getSnapShotFromAuth(userAuth, additionalInformation) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailed(err));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapShotFromAuth, user, additionalDetails);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthWithUserAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (err) {
    yield put(signUpFailed(err));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInAuthWithUserAndPassword, email, password);
    yield call(getSnapShotFromAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;
    yield call(getSnapShotFromAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_STATE_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_STATE_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield takeLatest(USER_STATE_TYPES.SIGN_UP_START, signUp);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_STATE_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_STATE_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_STATE_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
