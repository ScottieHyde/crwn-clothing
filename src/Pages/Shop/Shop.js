import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import CollectionsOverview from './CollectionsOverview/CollectionsOverview';
import CollectionPage from './Collection/Collection';
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { fetchCollectionStartActionAsync, selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/ShopReducer/shopReducer";

const CollectionsOverviewLoadingSpinner = LoadingSpinner(CollectionsOverview)
const CollectionPageLoadingSpinner = LoadingSpinner(CollectionPage)

class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionStartActionAsync } = this.props;
    fetchCollectionStartActionAsync()
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} render={(props) => (<CollectionsOverviewLoadingSpinner isLoading={isCollectionFetching} {...props} />)}/>
          <Route path={`${match.path}/:collectionId`} render={props => (<CollectionPageLoadingSpinner isLoading={!isCollectionsLoaded} {...props}/>)}/>
        </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartActionAsync: () => dispatch(fetchCollectionStartActionAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);