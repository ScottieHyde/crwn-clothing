
// Constants
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// Actions
export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user,
})

// Initial State
const INITIAL_STATE = {
    currentUser: null,
};

// Reducer
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer;