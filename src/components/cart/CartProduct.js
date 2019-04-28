import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import { removeFromCart } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';

class CartProduct extends Component{
    constructor(){
        super();
        this.state = {
            quantity: 1, /* default minimun qty 1 */
            viewAllDescription: false,
            total: 0
        };

        this.removeItemFromCart = this.removeItemFromCart.bind(this);
    }

    componentDidMount(){
        this.setState({ total: this.props.product.price });
    }

    increaseQuantity = () => {
        this.setState({ quantity: (this.state.quantity+1) }, () => {
            this.setTotalPrice();
        });
    }

    decreaseQuantity = () => {
        if(this.state.quantity > 1){
            this.setState({ quantity: (this.state.quantity-1) }, () => {
                this.setTotalPrice();
            });
        }
    }

    setTotalPrice(){
        let price = this.props.product.price;
        let total = this.state.quantity * price;
        this.setState({ total: total });
    }

    removeItemFromCart(){
        this.props.removeFromCart(this.props.product);
    }

    viewMoreDescription(){

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
                                    <td width="33%"><div align="center">Quantity:<br/>{ this.state.quantity }</div></td>
                                    <td width="33%" align="center"><a href="#!" onClick={ this.increaseQuantity } className="btn btn-primary"><i className="fa fa-plus"/></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-2 col-lg-2" align="right">
                        <b>Total:</b><br/>
                        <CurrencyFormat value={ this.state.total } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
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
    removeFromCart
})(CartProduct);