import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from "../Sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware(); // This can take an object with configuration but we don't need it

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

export default { store, persistor };