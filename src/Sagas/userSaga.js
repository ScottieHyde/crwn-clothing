import { takeLatest, put, call } from 'redux-saga/effects'
import {
  signInSuccess,
  signInFailure,
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
} from "../redux/UserReducer/userReducer";
import { googleProvider, auth, createUserProfileDocument } from "../firebase/firebase.utils";

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

function* watchUserSaga() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)

}

export { watchUserSaga }