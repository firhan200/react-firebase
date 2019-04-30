import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartProduct from './CartProduct';
import firebase from 'firebase';
import CurrencyFormat from 'react-currency-format';
import { toast } from 'react-toastify';
import { addDiscount, removeDiscount } from '../../redux/actions/cartActions';

const DISCOUNT = {
    id: 0,
    name: 'CASHBACK',
    total: 100000
};

class CartDetail extends Component{
    constructor(){
        super();
        //init state
        this.state = {
            products: [],
            loading: false,
            discountCode: '',
            checkoutAvailable: false
        };

        //bind func
        this.redeemDiscount = this.redeemDiscount.bind(this);
    }

    componentDidMount(){
        this.setProductsDetail(this.props.cart.items);
    }

    componentWillReceiveProps(newProps){
        //update state if props changed
        if(this.props.cart!==newProps.cart){
            //update
            this.setProductsDetail(newProps.cart.items);
        }
    }

    setProductsDetail(cartItems){
        //set loading
        this.setLoading(true);

        //get item ids from cartItems
        let itemIds = [];
        if(cartItems!==null){
            cartItems.map(item => {
                itemIds.push(item.id);
            })
        }

        //query to firebase
        const db = firebase.database().ref().child('/products');
        let promises = itemIds.map(key => {
            return db.child(key).once("value");
        });

        let productList = [];
        Promise.all(promises).then((snapshots) => {
            snapshots.forEach((snapshot) => {
                let product = snapshot.val();

                let cartItemLocalStorage = cartItems.find(item => { return item.id===snapshot.key });
                if(typeof cartItemLocalStorage!=='undefined'){
                    //add key to product
                    let productWithKey = Object.assign({}, product, {
                        key: snapshot.key,
                        quantity: cartItemLocalStorage.quantity,
                        total: cartItemLocalStorage.total
                    });
                    //push product to list of product
                    productList.push(productWithKey);
                }
            });
        }).then(() => {
            //set loading
            this.setLoading(false);

            //set state to trigger view
            this.setState({ products : productList });
        });
    }

    setLoading(isLoad){
        this.setState({ loading: isLoad });
    }

    redeemDiscount(e){
        e.preventDefault();

        //fake discount redeem
        console.log(this.props.cart.discounts);
        if(this.state.discountCode.toLowerCase()===DISCOUNT.name.toLowerCase()){
            //check if discount already added
            if(this.props.cart.discounts.filter(discount => { return discount.id===DISCOUNT.id }).length > 0){
                //discount already added
                //reset discount 
                this.setState({ discountCode: '' }, () => {
                    toast.warning(DISCOUNT.name+" Arleady Added!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });
            }else{
                //add discount to redux
                this.props.addDiscount(DISCOUNT, () => {
                    //reset discount 
                    this.setState({ discountCode: '' }, () => {
                        toast.success(DISCOUNT.name+" Successfully Added!", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    });
                });
            }
        }else{
            //discount not found
            toast.error("Discount Code Not Found!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    render(){
        let totalPrice = 0;

        const RenderDiscountAdded = (
            <div>
                {
                    this.props.cart.discounts.length > 0 ?
                    (
                        <div>
                            <h5>Discounts</h5>
                            {this.props.cart.discounts.map(discount => (
                                <div key={discount.id} className="row">
                                    <div className="col-sm-12" align="right">
                                        <b>{ discount.name }</b><br/>
                                        <CurrencyFormat value={ discount.total } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
                                        <br/>
                                        <a href="#!" onClick={(e) => {
                                            this.props.removeDiscount(discount, () => {});
                                        }}>remove <i className="fa fa-trash"/></a>
                                        <hr/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    ""
                }
            </div>
        );

        const RenderCart = (
            this.state.products.length > 0 ? (
                <div>
                {
                    this.state.products.map((product, key) => (
                        <CartProduct key={key} product={product}/>
                    ))
                }
                { RenderDiscountAdded }
                <br/>
                </div>
            ) : <div align='center'>No product in cart</div>
        );

        const RenderTotalPrice = (<div className="cart-total-price">
            {/* default price */}
            {
                this.state.products.map((product, key) => {
                    totalPrice = totalPrice + product.total;
                })
            }

            {/* discount total */}
            {
                this.props.cart.discounts.map(discount => {
                    totalPrice = totalPrice - discount.total;
                })
            }
            Total Cost: <CurrencyFormat value={ totalPrice } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
        </div>); 

        const RenderDiscount = (
            <div>
                { this.props.cart.items.length > 0 ? (
                <form onSubmit={this.redeemDiscount}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" 
                            placeholder="Enter Discount Code" 
                            aria-describedby="basic-addon2" 
                            value={this.state.discountCode}
                            onChange={(e) => {
                                this.setState({ discountCode : e.target.value })
                            }}
                            />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="submit">Redeem</button>
                        </div>
                    </div>
                </form>
                ) : "" }
            </div>
        );

        const Loading = (<div align="center">Loading cart...</div>);

        {/* is checkout available */}
        const RenderCheckout = (
            <div>
                { totalPrice > 0 ? (<a href="#" className="btn btn-warning">Checkout</a>) : "" }
            </div>
        );

        return(
            <div>
                <h4>My Cart</h4>
                <br/>
                {/* Cart Detail */}
                { this.state.loading ? Loading : RenderCart }

                {/* Cart Actions */}
                { 
                    !this.state.loading ? 
                    (
                        <div align="right">
                            <div className="row">
                                <div className="col-md-6 offset-md-6 col-lg-4 offset-lg-8">
                                    {RenderDiscount}
                                </div>
                            </div>
                            {RenderTotalPrice}
                            {RenderCheckout}
                        </div>
                    ) : 
                    ""
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart : state.cartReducer
});

export default connect(mapStateToProps, {
    addDiscount,
    removeDiscount
})(CartDetail);