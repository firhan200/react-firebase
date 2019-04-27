/* Lib */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

/* Components */
import Header from './components/Header';
import Footer from './components/Footer';

import AddProduct from './components/products/AddProduct';
import DetailProduct from './components/products/DetailProduct';
import ListProduct from './components/products/ListProduct';

import Register from './components/user/Register';
import Login from './components/user/Login';
import LogoutModal from './components/user/LogoutModal';
/* Components */

class App extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      <Router>
        <Route path="/" component={Header}/>
        <div className="container main-content">    
          <Route path="/" exact component={ListProduct}/>

          <Route path="/login" component={Login}/>

          <PrivateRoute path="/product/add" exact component={AddProduct}/>
          <Route path="/product/detail/:key" exact component={DetailProduct}/>

          <LogoutModal />
        </div>
        <Footer/>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated : state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {})(App);
