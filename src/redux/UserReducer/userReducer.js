import { createSelector } from 'reselect';

// Constants
export const GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START'

// Action Creators
export const googleSignInStart = () => ({
    type: GOOGLE_SIGN_IN_START
})

export const signInSuccess = user => ({
    type: SIGN_IN_SUCCESS,
    payload: user,
})

export const signInFailure  = error => ({
    type: SIGN_IN_FAILURE,
    payload: error
})

export const emailSignInStart = emailAndPassword => ({
    type: EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

// Selectors
const selectUser = state => state.user;
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

// Initial State
const INITIAL_STATE = {
    currentUser: null,
};

// Reducer
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;