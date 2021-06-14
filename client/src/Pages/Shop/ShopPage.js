import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Spinner from "../../Components/Spinner/Spinner";
import { fetchCollectionsStartAction } from "../../redux/ShopReducer/shopReducer";

const CollectionsOverViewContainer = lazy(() => import('../Shop/CollectionsOverview/CollectionsOverviewContainer/CollectonsOverviewContainer'))
const CollectionPageContainer = lazy(() => import('./CollectionPage/CollectionPageContainer/CollectionPageContainer'))

const ShopPage = ({ fetchCollectionsStartAction, match }) => {
  useEffect(() =>{
    fetchCollectionsStartAction()
  }, [fetchCollectionsStartAction])
  // if we don't pass fetchCollectionsStartAction here we get a warning
  // an empty array would accomplish the same thing

  return (
      <div className='shop-page'>
        <Suspense fallback={<Spinner/>}>
          <Route exact path={`${match.path}`} component={CollectionsOverViewContainer}/>
          <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </Suspense>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAction: () => dispatch(fetchCollectionsStartAction())
})

export default connect(null, mapDispatchToProps)(ShopPage);