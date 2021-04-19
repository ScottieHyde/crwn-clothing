import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../../Assets/shopping-bag.svg';

const ShoppingCartIcon = () => (
    <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

export default ShoppingCartIcon;