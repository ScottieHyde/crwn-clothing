import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {  selectIsCollectionsLoaded } from '../../../../redux/ShopReducer/shopReducer';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import CollectionPage from '../CollectionPage';

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state)
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  LoadingSpinner,
)(CollectionPage)

export default CollectionPageContainer;