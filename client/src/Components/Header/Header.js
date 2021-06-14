import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo} from '../../Assets/crown.svg';
import { createStructuredSelector } from 'reselect';
import ShoppingCartIcon from './ShoppingCartIcon/ShoppingCartIcon';
import ShoppingCart from './ShoppingCartIcon/ShoppingCart/ShoppingCart';
import { selectCartHidden } from '../../redux/CartReducer/cartReducer';
import { selectCurrentUser, signOutStartAction } from '../../redux/UserReducer/userReducer';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./Header.Styles";

const Header = ({ currentUser, hidden, signOutStartAction }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStartAction}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <ShoppingCartIcon/>
        </OptionsContainer>
        { hidden ? null : <ShoppingCart/> }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
})

const mapDispatchToProps = dispatch => ({
    signOutStartAction: () => dispatch(signOutStartAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);