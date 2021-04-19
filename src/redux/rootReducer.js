import { combineReducers } from 'redux';
import userReducer from './UserReducer/userReducer';
import cartReducer from './CartReducer/cartReducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
})