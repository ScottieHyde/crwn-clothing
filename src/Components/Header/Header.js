import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo} from '../../Assets/crown.svg';
// the above is special syntax to tell react we want a react component that renders an SVG
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.utils';
import ShoppingCartIcon from './ShoppingCartIcon/ShoppingCartIcon';
import ShoppingCart from './ShoppingCartIcon/ShoppingCart/ShoppingCart';
import { selectCartHidden } from '../../redux/CartReducer/cartReducer';
import { selectCurrentUser } from '../../redux/UserReducer/userReducer';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./Header.Styles";

const Header = ({ currentUser, hidden }) => (
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
                <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
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

export default connect(mapStateToProps)(Header);