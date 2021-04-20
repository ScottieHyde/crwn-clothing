import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../../redux/CartReducer/cartReducer';
import { selectCartItemsCount } from '../../../redux/CartReducer/cartReducer';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../../Assets/shopping-bag.svg';

const ShoppingCartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state),
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);