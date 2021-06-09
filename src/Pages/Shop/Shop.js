import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import{ bindActionCreators } from "redux";
import CollectionsOverview from './CollectionsOverview/CollectionsOverview';
import CollectionPage from './Collection/Collection';
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollectionAction } from "../../redux/ShopReducer/shopReducer";

const CollectionsOverviewLoadingSpinner = LoadingSpinner(CollectionsOverview)
const CollectionPageLoadingSpinner = LoadingSpinner(CollectionPage)

class ShopPage extends Component {
  state = {
    loading: true
  }
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollectionAction } = this.props;
    const collectionRef = firestore.collection('collections');
    // whenever the snapshot changes or is being ran for the first time we will get the data back
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollectionAction(collectionsMap)
      this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props
    const { loading } = this.state;
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} render={(props) => (<CollectionsOverviewLoadingSpinner isLoading={loading} {...props} />)}/>
          <Route path={`${match.path}/:collectionId`} render={props => (<CollectionPageLoadingSpinner isLoading={loading} {...props}/>)}/>
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