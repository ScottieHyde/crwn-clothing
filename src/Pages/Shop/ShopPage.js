import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCollectionsStartAction } from "../../redux/ShopReducer/shopReducer";
import CollectionsOverViewContainer from '../Shop/CollectionsOverview/CollectionsOverviewContainer/CollectonsOverviewContainer';
import CollectionPageContainer from './CollectionPage/CollectionPageContainer/CollectionPageContainer';


const ShopPage = ({ fetchCollectionsStartAction, match }) => {
  useEffect(() =>{
    fetchCollectionsStartAction()
  }, [fetchCollectionsStartAction])
  // if we don't pass fetchCollectionsStartAction here we get a warning
  // an empty array would accomplish the same thing

  return (
      <div className='shop-page'>
          <Route exact path={`${match.path}`} component={CollectionsOverViewContainer}/>
          <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAction: () => dispatch(fetchCollectionsStartAction())
})

export default connect(null, mapDispatchToProps)(ShopPage);