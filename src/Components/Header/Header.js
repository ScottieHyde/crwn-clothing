import React from 'react';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo} from '../../Assets/crown.svg';
// the above is special syntax to tell react we want a react component that renders an SVG

import './header.styles.scss';

const Header = () => (
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
        </div>
    </div>
)

export default Header;