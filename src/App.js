/* Lib */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/* Components */
import Header from './components/Header';
import Footer from './components/Footer';

import AddProduct from './components/products/AddProduct';
import DetailProduct from './components/products/DetailProduct';
import ListProduct from './components/products/ListProduct';
/* Components */

class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <div className="container main-content">    
          <Route path="/" exact component={ListProduct}/>
          <Route path="/product/add" exact component={AddProduct}/>
          <Route path="/product/detail/:key" exact component={DetailProduct}/>
        </div>
        <Footer/>
      </Router>
    );
  }
}

export default App;
