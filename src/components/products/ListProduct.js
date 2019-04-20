import React from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase';

class ListProduct extends React.Component{

    constructor(){
        super();
        this.state = {
            data : 10
        }
    }

    componentDidMount(){
        //globar var
        //const db = firebase.database().ref().child('products');
        // db.on('value', snapshot => {
        //     this.setState({
        //         data : snapshot.val()
        //     });
        // })
    }

    render(){
        return(
            <div>
                <Link to="/product/add" className="btn btn-primary">Add Product</Link>
                <div>
                    <label>Products</label><br/>
                    {this.state.data}
                </div>
            </div>
        );
    }
}

export default ListProduct;