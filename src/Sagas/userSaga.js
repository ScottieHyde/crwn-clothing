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
} from "../redux/UserReducer/userReducer";
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from "../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth)
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

function* watchUserSaga() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
  yield takeLatest(SIGN_OUT_START, signOut)
}

export { watchUserSaga }