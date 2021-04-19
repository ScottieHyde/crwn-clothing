import React from 'react';
import  CustomButton from '../../../CustomButton/CustomButton';
import './cart-dropdown.styles.scss';

const ShoppingCart = () => (
    <div className='cart-dropdown'>
        <div className='cart-items'/>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

export default ShoppingCart;