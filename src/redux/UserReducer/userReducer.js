import { createSelector } from 'reselect';

// Constants
export const GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START'
export const CHECK_USER_SESSION = 'CHECK_USER_SESSION'
export const SIGN_OUT_START = 'SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';
export const SIGN_UP_START = 'SIGN_UP_START'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'



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

export const checkUserSession = () => ({
    type: CHECK_USER_SESSION
})

export const signOutStartAction = () => ({
    type: SIGN_OUT_START,
})

export const signOutSuccessAction = () => ({
    type: SIGN_OUT_SUCCESS
})

export const signOutFailureAction = (error) => ({
    type: SIGN_OUT_FAILURE,
    payload: error,
})

export const signUpStartAction = userCredentials => ({
    type: SIGN_UP_START,
    payload: userCredentials,
})

export const signUpSuccessAction = ({ user, additionalData }) => ({
    type: SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailureAction = error => ({
    type: SIGN_UP_FAILURE,
    payload: error,
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
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            }
        case SIGN_IN_FAILURE:
        case SIGN_OUT_FAILURE:
        case SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;