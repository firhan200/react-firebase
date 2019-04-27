import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Register from './Register';

class Login extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <LoginForm />
                    <Register history={ this.props.history }/>
                </div>
            </div>
        );
    }
}

export default Login;