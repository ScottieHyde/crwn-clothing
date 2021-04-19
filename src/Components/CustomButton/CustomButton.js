import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
    // children here is anything inside the element that we typed
    // in this case it's Sign in since that's between <CustomButton>Sign in</CustomButton>
    return (
        <button
        className={`${inverted ? 'inverted' : ''}${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}> 
            {children}
        </button>
    )
}

export default CustomButton;