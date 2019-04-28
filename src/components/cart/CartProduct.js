import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';

class CartProduct extends Component{
    constructor(){
        super();
        this.state = {
            quantity: 0,
            total: 0
        };
    }

    increaseQuantity = () => {
        this.setState({ quantity: (this.state.quantity+1) }, () => {
            this.setTotalPrice();
        });
    }

    decreaseQuantity = () => {
        if(this.state.quantity > 0){
            this.setState({ quantity: (this.state.quantity-1) }, () => {
                this.setTotalPrice();
            });
        }
    }

    setTotalPrice(){
        let price = 75000;
        let total = this.state.quantity * price;
        this.setState({ total: total });
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
                        { product.description }
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
                        <a href="#!">Remove from cart</a>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default CartProduct;