import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { initCartItems } from '../redux/actions/cartActions';

class NavMenu extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: ''
        }
    }

    componentDidMount(){
        //set displayName
        this.setState({ displayName: this.props.user.displayName });
    }

    logout = () => {
        this.props.logout(() => {
            this.props.route.history.push('/');
        });
    }

    componentWillReceiveProps(newProps){
        if(this.props.user!==newProps.user){
            //set displayName
            this.setState({ displayName: newProps.user.displayName });
        }
    }

    render(){
        const cartDisplay = 
                <li className="nav-item active">
                    <Link to="/cart" className="nav-link"><i className="fa fa-shopping-cart"></i>&nbsp;
                    <span className="badge badge-light">{ (typeof this.props.cart)!=="undefined" ? this.props.cart.length : "0" }</span>
                    </Link>
                </li>

        return(
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                { !this.props.isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li> 
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    { cartDisplay }
                </ul>
                ) : (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#!">
                            <i className="fa fa-user-circle"/>&nbsp;
                            { this.props.user.displayName }
                        </a>
                    </li> 
                    <li className="nav-item active">
                        <a className="nav-link" href="#!" onClick={ this.logout }>Logout</a>
                    </li>
                    { cartDisplay }
                </ul>
                ) }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart : state.cartReducer.items,
    user : state.authReducer.user
})

export default connect(mapStateToProps, {
    logout,
    initCartItems
})(NavMenu);