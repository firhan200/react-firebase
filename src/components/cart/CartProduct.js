import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import { removeFromCart, updateCartItem } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';

class CartProduct extends Component{
    constructor(){
        super();
        this.state = {
            viewAllDescription: false
        };

        this.removeItemFromCart = this.removeItemFromCart.bind(this);
    }

    increaseQuantity = () => {
        let newProductState = {
            id: this.props.product.key,
            quantity: (this.props.product.quantity + 1),
            total: this.setTotalPrice(this.props.product.quantity + 1)
        }
        //update
        this.props.updateCartItem(newProductState);
    }

    decreaseQuantity = () => {
        if(this.props.product.quantity > 1){
            let newProductState = {
                id: this.props.product.key,
                quantity: (this.props.product.quantity - 1),
                total: this.setTotalPrice(this.props.product.quantity - 1)
            }
    
            //update
            this.props.updateCartItem(newProductState);
        }
    }

    setTotalPrice(quantity){
        let price = this.props.product.price;
        let total = quantity * price;
        return total;
    }

    removeItemFromCart(){
        this.props.removeFromCart(this.props.product);
    }

    render(){
        let product = this.props.product;
        const thumbnail = product.images.length > 0 ? 
            (
            <a href="#!" className='detail-image-container'>
                <img alt="" src={product.images[0]} className="detail-image-preview"></img>
            </a>
            ) 
            : "no image";

        const maxLength = 50;
        const RenderDescription = 
        this.state.viewAllDescription ? 
        (
            <div>
                {product.description}
                <br/>
                <a href="#!" onClick={() => {
                    this.setState({ viewAllDescription: !this.state.viewAllDescription })
                }}>view less</a>
            </div>
        ) :
        product.description.length > maxLength ?
            (
                <div>
                    {product.description.slice(0, 50)}
                    ...
                    <br/>
                    <a href="#!" onClick={() => {
                        this.setState({ viewAllDescription: !this.state.viewAllDescription })
                    }}>view more</a>
                </div>
            )
            : (
                <div>
                    {product.description}
                </div>
            );

        return(
            <div>
                <div className="row cart-detail">
                    <div className="col-md-1 col-lg-1">
                        {thumbnail}
                    </div>
                    <div className="col-md-2 col-lg-2">
                        { product.name }
                    </div>
                    <div className="col-md-1 col-lg-1">
                        <label className="badge badge-primary">{ product.category }</label>
                    </div>
                    <div className="col-md-3 col-lg-3">
                        { RenderDescription }
                    </div>
                    <div className="col-md-3 col-lg-3">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td width="33%" align="center"><a href="#!" onClick={ this.decreaseQuantity } className="btn btn-danger"><i className="fa fa-minus"/></a></td>
                                    <td width="33%"><div align="center">Quantity:<br/>{ product.quantity }</div></td>
                                    <td width="33%" align="center"><a href="#!" onClick={ this.increaseQuantity } className="btn btn-primary"><i className="fa fa-plus"/></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-2 col-lg-2" align="right">
                        <b>Total:</b><br/>
                        <CurrencyFormat value={ product.total } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
                        <br/>
                        <a href="#!" onClick={ this.removeItemFromCart }>Remove from cart</a>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default connect(null, {
    removeFromCart,
    updateCartItem
})(CartProduct);