import { addItemToCart } from './cart.utils';
import { createSelector } from 'reselect';

// constants
export const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN';
export const ADD_ITEM = 'ADD_ITEM';

// Selectors
// input selector
const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accu, cartItem) => accu + cartItem.quantity, 0)
);
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accu, cartItem) => accu + cartItem.quantity * cartItem.price, 0)
)

// actions
export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN,
})

export const addItem = item => ({
    type: ADD_ITEM,
    payload: item,
})

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload),
            }
        default:
            return state;
    }
}

export default cartReducer;