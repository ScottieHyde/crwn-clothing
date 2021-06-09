import { createSelector } from 'reselect';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

// Constants
export const FETCH_COLLECTIONS_START = 'FETCH_COLLECTIONS_START';
export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAILURE = 'FETCH_COLLECTIONS_FAILURE';

// Action Creators
export function fetchCollectionsStartAction() {
    return {
        type: FETCH_COLLECTIONS_START,
    }
}

export function fetchCollectionsSuccessAction(collectionsMap) {
    return {
        type: FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
}

export function fetchCollectionsFailureAction(errorMessage) {
    return {
        type: FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage,
    }
}

export const fetchCollectionStartActionAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStartAction()) // dispatch action saying the api call started
        collectionRef.get()
            .then(snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
                dispatch(fetchCollectionsSuccessAction(collectionsMap))
            })
            .catch(error => dispatch(fetchCollectionsFailureAction(error)))
    }
}


// Selectors
// Input Selector
const selectShop = state => state.shop;
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections,
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export function selectCollection(collectionUrlParam) {
    return (
        createSelector([selectCollections], collections =>  collections ? collections[collectionUrlParam] : null)
    )
}

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

// Initial State
const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_COLLECTIONS_START:
            return { ...state, isFetching: true }
        case FETCH_COLLECTIONS_SUCCESS:
            return { ...state, isFetching: false, collections: action.payload }
        case FETCH_COLLECTIONS_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload }
        default:
            return state;
    }
}

export default shopReducer;