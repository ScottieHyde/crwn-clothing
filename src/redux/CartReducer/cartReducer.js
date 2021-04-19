
// constants
export const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN';
export const ADD_ITEM = 'ADD_ITEM';

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
    console.log(state)
    switch(action.type) {
        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            }
        default:
            return state;
    }
}

export default cartReducer;