import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout  } from '../redux/actions/authActions';

class Header extends React.Component{
    logout = () => {
        this.props.logout(() => {
            this.props.route.history.push('/');
        });
    }

    render(){
        return(
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav navbar-right">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    { !this.props.isAuthenticated ? (
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    ) : (
                        <li className="nav-item active">
                            <a className="nav-link" href="#!" onClick={ this.logout }>Logout</a>
                        </li>
                    ) }
                </ul>
            </div>
        );
    }
}

export default connect(null, {
    logout
})(Header);