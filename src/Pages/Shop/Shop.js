import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import{ bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import CollectionsOverview from './CollectionsOverview/CollectionsOverview';
import CollectionPage from './Collection/Collection';
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollectionAction, fetchCollectionStartActionAsync, selectIsCollectionFetching } from "../../redux/ShopReducer/shopReducer";

const CollectionsOverviewLoadingSpinner = LoadingSpinner(CollectionsOverview)
const CollectionPageLoadingSpinner = LoadingSpinner(CollectionPage)

class ShopPage extends Component {
  // state = {
  //   loading: true
  // }
  // unsubscribeFromSnapshot = null

  componentDidMount() {
    const { fetchCollectionStartActionAsync } = this.props;
    fetchCollectionStartActionAsync()
    // const { updateCollectionAction } = this.props;
    // const collectionRef = firestore.collection('collections');
    // whenever the snapshot changes or is being ran for the first time we will get the data back

    // Using fetch to call an firebase API
    // fetch('https://firestore.googleapis.com/v1/projects/crown-db-45cdf/databases/(default)/documents/collections')
    //     .then(response => response.json())
    //     .then(collections => console.log(collections))

    // Using the promise based approach
    // makes a api call to fetch back the data associated to this collectionRef
    // Since this is no longer an Observable we only fetch the data when this component mounts
    // collectionRef.get()
    //     .then(snapshot => {
    //       const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //       updateCollectionAction(collectionsMap)
    //       this.setState({loading: false})
    // })

    // Using the Observable "Subscription" approach
    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollectionAction(collectionsMap)
    //   this.setState({loading: false})
    // })
  }

  render() {
    const { match, isCollectionFetching } = this.props
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} render={(props) => (<CollectionsOverviewLoadingSpinner isLoading={isCollectionFetching} {...props} />)}/>
          <Route path={`${match.path}/:collectionId`} render={props => (<CollectionPageLoadingSpinner isLoading={isCollectionFetching} {...props}/>)}/>
        </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartActionAsync: () => dispatch(fetchCollectionStartActionAsync())
})

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//       {
//         updateCollectionAction
//       },
//       dispatch
//   )
// }

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);