import React from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase';

class ListProduct extends React.Component{

    constructor(){
        super();
        this.state = {
            products : []
        }
    }

    componentDidMount(){
        const db = firebase.database().ref().child('products');
        db.on('value', snapshot => {
            let products = [];

            //looping all data
            snapshot.forEach(childSnapshot => {
                //push to array
                let product = childSnapshot.val();
                products.push({
                    name: product.name,
                    images: product.images,
                    category: product.category,
                    description : product.description
                })
            })
            //set to state
            this.setState({ products : products.reverse() });
        }, (err) => {
            if(err){

            }else{
                
            }
        });
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-3">
                    <Link to="/product/add" className="btn btn-sm btn-primary"><i className="fa fa-plus-circle"></i> Add Product</Link>
                    <div className="chart">
                        <label>Product charts:</label>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9">
                    {this.state.products.length > 0 ? <RenderProducts products={this.state.products} /> : <NoResult /> }
                </div>
            </div>
        );
    }
}

function RenderProducts(props){
    let result = [];

    props.products.map(product => {
        result.push(
            <div className="col-sm-6 col-md-4 col-lg-3 product-col">
                <div className="product-container">
                    <div className="product-name">
                        {product.name}
                        <div className="product-category">
                            {product.category}
                        </div>
                    </div>
                    <div className="product-image-container">
                        <img className="product-image" src={product.images[0]}></img>
                    </div>
                    <div className="product-desc">
                        { product.description.length > 50 ? product.description.slice(0, 50)+"..." : product.description }
                    </div>
                </div>
            </div>
        );
    })
    return(<div className="row">{result}</div>);
}

function NoResult(){
    return(
        <div align="center">No Result</div>
    );
}

export default ListProduct;