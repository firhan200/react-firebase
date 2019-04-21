import React from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase';
import ChartProduct from './ChartProduct';

class ListProduct extends React.Component{

    constructor(){
        super();
        this.state = {
            keyword : '',
            products : [],
            searchResults : [],
            isLoading : false
        }

        this.handleKeyword = this.handleKeyword.bind(this);
    }

    componentDidMount(){
        //set loading
        this.setState({ isLoading : true });

        const db = firebase.database().ref().child('products');
        db.on('value', snapshot => {
            let products = [];

            //looping all data
            snapshot.forEach(childSnapshot => {
                //push to array
                let product = childSnapshot.val();
                products.push({
                    key: childSnapshot.key,
                    name: product.name,
                    images: product.images,
                    category: product.category,
                    description : product.description
                })
            })
            //set to state
            this.setState({ products : products.reverse() });

            //set loading
            this.setState({ isLoading : false });
        }, (err) => {
            if(err){

            }else{
                
            }

            //set loading
            this.setState({ isLoading : false });
        });
    }

    handleKeyword(e){
        //set keyword state
        this.setState({keyword : e.target.value});
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-3">
                    <Link to="/product/add" className="btn btn-sm btn-primary"><i className="fa fa-plus-circle"></i> Add Product</Link>
                    <div className="chart">
                        <ChartProduct products={this.state.products}/>
                    </div>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-5">
                            <div className="search-product-container">  
                                <input type="text" className="form-control" placeholder="search products" value={this.state.keyword} onChange={this.handleKeyword}/>
                            </div>
                        </div>
                    </div>
                    {this.state.products.length > 0 ? <RenderProducts keyword={this.state.keyword} products={this.state.products} /> : <NoResult isLoading={this.state.isLoading}/> }
                </div>
            </div>
        );
    }
}

function RenderProducts(props){
    let result = [];

    props.products.filter((product) => {
        return product.name.includes(props.keyword);
    }).map(product => {
        result.push(
            <div key={product.key} className="col-sm-6 col-md-4 col-lg-3">
                <Link to={'/product/detail/'+product.key} className="product-link">
                    <div className="product-container">
                        <div className="product-name">
                            {product.name}
                            <div className="product-category">
                                {product.category}
                            </div>
                        </div>
                        <div className="product-image-container">
                            <img alt={product.name} className="product-image" src={product.images[0]}></img>
                        </div>
                        <div className="product-desc">
                            { product.description.length > 50 ? product.description.slice(0, 50)+"..." : product.description }
                        </div>
                    </div>
                </Link>
            </div>
        );

        return true;
    })
    return(<div className="row">{result}</div>);
}

function NoResult(props){
    if(props.isLoading){
        return(
            <div align="center">Loading...</div>
        );
    }else{
        return(
            <div align="center">No Result</div>
        );
    }
}

export default ListProduct;