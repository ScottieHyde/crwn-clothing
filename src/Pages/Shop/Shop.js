import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from "../../Components/CollectionPreview/CollectionPreview";

import { selectCollections } from '../../redux/ShopReducer/shopReducer';

const ShopPage = ({ collections}) => (
    <div className='shop-page'>
                {collections.map(({id, ...otherCollectionPops}) => (
                    <CollectionPreview key={id} {...otherCollectionPops} />
                ))}
            </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
})

export default connect(mapStateToProps)(ShopPage);