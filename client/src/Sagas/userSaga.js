import { takeLatest, put, call } from 'redux-saga/effects'
import {
  signInSuccess,
  signInFailure,
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  signOutSuccessAction,
  signOutFailureAction,
  SIGN_UP_START,
  signUpFailureAction,
  signUpSuccessAction,
  SIGN_UP_SUCCESS,
} from "../redux/UserReducer/userReducer";
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from "../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
    const userSnapshot = yield userRef.get()
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch(error) {
    yield put(signInFailure(error))

  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider)
    yield getSnapShotFromUserAuth(user)
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user)
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield getSnapShotFromUserAuth(userAuth)
    }
  } catch(error) {
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccessAction())
  } catch(error) {
    yield put(signOutFailureAction(error))
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    yield put(signUpSuccessAction({ user, additionalData: { displayName } }))
  } catch(error) {
    yield put(signUpFailureAction(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

function* watchUserSaga() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
  yield takeLatest(SIGN_OUT_START, signOut);
  yield takeLatest(SIGN_UP_START, signUp);
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export { watchUserSaga }