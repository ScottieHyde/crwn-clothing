import React from 'react';
import FormInput from '../FormInput/FormInput';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({email: '', password:''})
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value}) // this will pull the name either password or email and dynamically set the sate property
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />
                    <input type="submit" value='Submit Form'></input>
                </form>
            </div>
        )
    }
}

export default SignIn;