import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartProduct from './CartProduct';
import firebase from 'firebase';

class CartDetail extends Component{
    constructor(){
        super();
        //init state
        this.state = {
            products: [],
            loading: false
        };
    }

    componentDidMount(){
        this.setProductsDetail(this.props.cart.items);
    }

    componentWillReceiveProps(newProps){
        //update state if props changed
        if(this.props.cart.items!==newProps.cart.items){
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

    render(){
        const RenderCart = (
            this.state.products.length > 0 ? (
                this.state.products.map((product, key) => (
                    <CartProduct key={key} product={product}/>
                ))
            ) : <div align='center'>No product in cart</div>
        );

        const Loading = (<div align="center">Loading cart...</div>);

        return(
            <div>
                <h4>My Cart</h4>
                <br/>
                { this.state.loading ? Loading : RenderCart }
                { !this.state.loading ? (
                    <div align="right">
                        <a href="#" className="btn btn-warning">Checkout</a>
                    </div>
                ) : ""}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart : state.cartReducer
});

export default connect(mapStateToProps, {
})(CartDetail);