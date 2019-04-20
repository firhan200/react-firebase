/* Lib */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/* Components */
import Header from './components/Header';
import Footer from './components/Footer';

import AddProduct from './components/products/AddProduct';
import ListProduct from './components/products/ListProduct';
/* Components */

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container main-content">
          <Router>
            <Route path="/" exact component={ListProduct}/>
            <Route path="/product/add" component={AddProduct}/>
          </Router>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
