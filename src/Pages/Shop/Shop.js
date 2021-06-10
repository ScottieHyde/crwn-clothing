import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCollectionsStartAction } from "../../redux/ShopReducer/shopReducer";
import CollectionsOverViewContainer from '../Shop/CollectionsOverview/CollectionsOverviewContainer/CollectonsOverviewContainer';
import CollectionPageContainer from './CollectionPage/CollectionPageContainer/CollectionPageContainer';


class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStartAction } = this.props;
    fetchCollectionsStartAction()
  }

  render() {
    const { match } = this.props
    return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} component={CollectionsOverViewContainer}/>
          <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAction: () => dispatch(fetchCollectionsStartAction())
})

export default connect(null, mapDispatchToProps)(ShopPage);