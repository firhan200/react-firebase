import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout  } from '../redux/actions/authActions';
import NavMenu from './NavMenu';

class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-primary navbar-expand-md">
                <Link className="navbar-brand" to="/"><i className="fa fa-bolt"></i></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavMenu route={this.props} isAuthenticated={ this.props.isAuthenticated }/>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated : state.authReducer.isAuthenticated,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {
    logout
})(Header);