import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo} from '../../Assets/crown.svg';
// the above is special syntax to tell react we want a react component that renders an SVG

import { auth } from '../../firebase/firebase.utils';
import ShoppingCartIcon from './ShoppingCartIcon/ShoppingCartIcon';
import ShoppingCart from './ShoppingCartIcon/ShoppingCart/ShoppingCart';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <ShoppingCartIcon/>
        </div>
        { hidden ? null : <ShoppingCart/> }
    </div>
)

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);