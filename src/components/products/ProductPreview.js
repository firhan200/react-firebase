import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

class ProductPreview extends Component{
    addToCart = (product) => {
        this.props.addToCart(product);
    }

    render(){
        return(
            <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="product-container">
                    <Link to={'/product/detail/'+this.props.product.key} className="product-link">
                        <div className="product-name">
                            {this.props.product.name}
                            <div className="product-category">
                                {this.props.product.category}
                            </div>
                        </div>
                        <div className="product-image-container">
                            <img alt={this.props.product.name} className="product-image" src={this.props.product.images[0]}></img>
                        </div>
                        <div className="product-desc">
                            { this.props.product.description.length > 50 ? this.props.product.description.slice(0, 50)+"..." : this.props.product.description }
                        </div>
                    </Link>
                    <div className="product-actions">
                        <div className="row">
                            <div className="col-sm-3">
                            <a href="#!" className="cart-icon" onClick={() => {
                                    this.addToCart(this.props.product);
                                }}><i className="fa fa-cart-plus"/></a>
                            </div>
                            <div className="col-sm-9">
                                <div className="product-price">
                                    <CurrencyFormat value={ this.props.product.price } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,{
    addToCart,
    removeFromCart
})(ProductPreview);