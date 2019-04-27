import React, { Component } from 'react';

class LoginForm extends Component{
    render(){
        return(
            <div>
                <form>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" className="form-control" placeholder="input email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn full btn-sm btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;