import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import{ bindActionCreators } from "redux";
import CollectionsOverview from './CollectionsOverview/CollectionsOverview';
import CollectionPage from './Collection/Collection';
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollectionAction } from "../../redux/ShopReducer/shopReducer";

class ShopPage extends Component {
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollectionAction } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot => { // whenever the snapshot changes or is being ran for the first time we will get the data back
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollectionAction(collectionsMap)
    })
  }

  render() {
    const { match } = this.props
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} component={CollectionsOverview}/>
          <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        updateCollectionAction
      },
      dispatch
  )
}

export default connect(null, mapDispatchToProps)(ShopPage);