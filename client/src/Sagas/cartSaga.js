import { takeLatest, put } from 'redux-saga/effects';
import { clearCart } from '../redux/CartReducer/cartReducer';
import { SIGN_OUT_SUCCESS } from '../redux/UserReducer/userReducer';

export function* clearCartOnSignOut() {
  yield put(clearCart())
}

export function* watchCartSaga() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
}