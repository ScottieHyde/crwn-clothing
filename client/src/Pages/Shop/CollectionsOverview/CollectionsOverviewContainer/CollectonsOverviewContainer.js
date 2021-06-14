import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../../../redux/ShopReducer/shopReducer'
import { compose } from 'redux';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import CollectionsOverview from '../CollectionsOverview';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
})

const CollectionsOverViewContainer = compose(
  connect(mapStateToProps),
  LoadingSpinner
)(CollectionsOverview)

export default CollectionsOverViewContainer;