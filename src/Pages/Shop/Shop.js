import React from 'react';
import SHOP_DATA from "./shopData";
import CollectionPreview from "../../Components/CollectionPreview/CollectionPreview";

class ShopPage extends React.Component {
    constructor() {
        super();
        this.state = {
            collections: SHOP_DATA
        }
    }
    render() {
        const { collections } = this.state;
        return (
            <div className='shop-page'>
                {collections.map(({id, ...otherCollectionPops}) => (
                    <CollectionPreview key={id} {...otherCollectionPops} />
                ))}
            </div>
        )
    }
}

export default ShopPage;