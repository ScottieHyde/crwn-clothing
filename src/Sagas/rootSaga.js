import { all, call } from 'redux-saga/effects';
import { watchShopSaga } from "./shopSaga";
import { watchUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
      call(watchShopSaga),
      call(watchUserSaga),
  ])
}