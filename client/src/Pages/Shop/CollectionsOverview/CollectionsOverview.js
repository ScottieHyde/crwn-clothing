import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../../Components/CollectionPreview/CollectionPreview';
import { selectCollectionsForPreview } from '../../../redux/ShopReducer/shopReducer'

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({id, ...otherCollectionPops}) => (
      <CollectionPreview key={id} {...otherCollectionPops} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionsOverview);