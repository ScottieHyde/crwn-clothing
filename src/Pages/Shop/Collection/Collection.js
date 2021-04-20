import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../../Components/CollectionItem/CollectionItem';

import { selectCollection, selectCollections } from '../../../redux/ShopReducer/shopReducer';

import './collection.styles.scss';

const CollectionPage = ({ match }) => (
  <div className='collection-page'>
    <h2>Collection PAGE</h2>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);