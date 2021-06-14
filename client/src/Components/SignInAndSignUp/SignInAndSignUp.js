import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = () => (
    <div className="sign-in-and-sign-up">
        <SignIn/>
        <SignUp/>
    </div>
)

export default SignInAndSignUp;