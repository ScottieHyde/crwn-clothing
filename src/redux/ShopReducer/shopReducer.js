import { createSelector } from 'reselect';
import SHOP_DATA from './shopData';

// Constants
export const UPDATE_COLLECTIONS = 'UPDATE_COLLECTIONS';

// Action Creators
export function updateCollectionAction(collections) {
    return {
        type: UPDATE_COLLECTIONS,
        payload: collections
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
    collections => Object.keys(collections).map(key => collections[key])
)

export function selectCollection(collectionUrlParam) {
    return (
        createSelector([selectCollections], collections => collections[collectionUrlParam])
    )
}

// Initial State
const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_COLLECTIONS:
            return { ...state, collections: action.payload }
        default:
            return state;
    }
}

export default shopReducer;