import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
    // children here is anything inside the element that we typed
    // in this case it's Sign in since that's between <CustomButton>Sign in</CustomButton>
    return (
        <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}> 
            {children}
        </button>
    )
}

export default CustomButton;