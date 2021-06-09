import React from 'react';
import { CustomButtonContainer } from "./CustomButton.Styles";

const CustomButton = ({ children, ...props }) => {
    // children here is anything inside the element that we typed
    // in this case it's Sign in since that's between <CustomButton>Sign in</CustomButton>
    return (
        <CustomButtonContainer {...props}>
            {children}
        </CustomButtonContainer>
    )
}

export default CustomButton;