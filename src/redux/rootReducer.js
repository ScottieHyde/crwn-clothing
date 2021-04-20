import { combineReducers } from 'redux';
import userReducer from './UserReducer/userReducer';
import cartReducer from './CartReducer/cartReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', // at what point inside our reducer do we want to start storing. in this case root or everything
    storage,
    whitelist: ['cart'], // only reducer we want to persist
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})

export default persistReducer(persistConfig, rootReducer);