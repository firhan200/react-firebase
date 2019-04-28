import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import CurrencyFormat from 'react-currency-format';

class DetailProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            key : props.match.params.key,
            productName : "",
            productCategory : "",
            productDescription : "",
            productPrice: 0,
            createdOn : "",
            updatedOn : "",
            images: [],
            currentDisplayImage: '',
            isSuccess : false,
            errorMessage : '',
        }

        //init func
        this.setDisplayImage = this.setDisplayImage.bind(this);
    }

    componentDidMount(){
        const db = firebase.database().ref().child('products');
        db.orderByKey().equalTo(this.state.key).once('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                let product = childSnapshot.val();

                //set to view
                this.setProductDetail(product);
            })
        })
    }

    setDisplayImage(e){
        //set current image display state
        let imageUrl = '';
        if(e.target.getAttribute('data-src')){
            //from anchor
            imageUrl = e.target.getAttribute('data-src');
        }else{
            //from image
            imageUrl = e.target.src;
        }
        //set state
        this.setState({currentDisplayImage : imageUrl});
    }

    setProductDetail(product){
        //get default displat image
        let defaultImageUrl = '';
        if(product.images.length > 0){
            //default image = first image
            defaultImageUrl = product.images[0];
        }

        //set product detail
        this.setState({ 
            productName : product.name,
            productDescription: product.description,
            productCategory: product.category,
            images : product.images,
            productPrice : product.price,
            currentDisplayImage: defaultImageUrl
        });
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <RenderDisplayImage imageUrl={this.state.currentDisplayImage} />
                    {this.state.images.map((image, key) => 
                        <a href="#!" key={key} className='detail-image-container' onClick={this.setDisplayImage} data-src={image}>
                            <img alt="" src={image} className="detail-image-preview"></img>
                        </a>
                    )}
                </div>
                <div className="col-sm-6 col-md-8 col-lg-9">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>
                                    {this.state.productName}
                                    <br/>
                                    <label className="badge badge-primary">{this.state.productCategory}</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {this.state.productDescription}
                                    <div className="product-detail-price">
                                        <CurrencyFormat value={ this.state.productPrice } displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function RenderDisplayImage(props){
    if(props.imageUrl!==''){
        return(
            <div className='display-image-container'>
                <img alt="" src={props.imageUrl} className='detail-image-main'></img>
            </div>
        );
    }else{
        return(<div></div>);
    }
}

export default DetailProduct;