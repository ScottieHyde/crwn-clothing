import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_COLLECTIONS_START,
  fetchCollectionsSuccessAction,
  fetchCollectionsFailureAction
} from '../redux/ShopReducer/shopReducer';
import {convertCollectionsSnapshotToMap, firestore} from "../firebase/firebase.utils";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccessAction(collectionsMap))
  } catch(error) {
    yield put(fetchCollectionsFailureAction(error.message))
  }
}

function* watchShopSaga() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export { watchShopSaga }