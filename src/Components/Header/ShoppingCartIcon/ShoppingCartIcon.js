import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../../redux/CartReducer/cartReducer';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../../Assets/shopping-bag.svg';

const ShoppingCartIcon = ({ toggleCartHidden }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
})

export default connect(null, mapDispatchToProps)(ShoppingCartIcon);