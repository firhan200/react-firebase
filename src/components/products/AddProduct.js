import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import firebase from 'firebase';

class AddProduct extends React.Component{
    constructor(props){
        super(props);

        this.images = [];

        this.state = {
            productName : "",
            productCategory : "",
            productDescription : "",
            createdOn : "",
            updatedOn : "",
            categories : [
                {
                    key : 0,
                    display : "Choose Category",
                    value : ""
                },
                {
                    key : 1,
                    display : "Fashion",
                    value : "Fashion"
                },
                {
                    key : 2,
                    display : "Gadget",
                    value : "Gadget"
                },
                {
                    key : 3,
                    display : "Sport",
                    value : "Sport"
                }
            ],
            isSuccess : false,
            isSubmitting : false,
            errorMessage : '',
            image1 : {},
            image2 : {},
            image3 : {},
            imageLeft : 3
        }

        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductDescriptionChange = this.handleProductDescriptionChange.bind(this);
        this.handleProductCategoryChange = this.handleProductCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    saveProduct() {
        //init firebase
        const db = firebase.database().ref().child('products');

        let product = {
            name : this.state.productName,
            category : this.state.productCategory,
            description : this.state.productDescription,
            createdOn : Date.now(),
            updatedOn : ''
        }

        console.log(product);

        //save to firebase
        try{
            db.push().set(product, (err) => {
                if(err){
                    //error
                    this.setState({ isSuccess : false });
                    this.setState({ errorMessage : err.message });
                }else{
                    //success
                    this.setState({ isSuccess : true });
                    this.setState({ errorMessage : '' });
                }
    
                //enable submit button
                this.setState({ isSubmitting : false });
            });
        }catch(err){
            //error
            this.setState({ isSuccess : false });
            this.setState({ errorMessage : err.message });
        }
    }

    resetForm(){
        //reset state
        this.setState({productName : ''});
        this.setState({productDescription : ''});
        this.setState({productCategory : ''});
    }

    handleProductNameChange(e){
        this.setState({productName : e.target.value });
    }

    handleProductDescriptionChange(e){
        this.setState({productDescription : e.target.value });
    }

    handleProductCategoryChange(e){
        console.log(e.target.value);
        this.setState({productCategory : e.target.value});
    }

    handleSubmit(e){
        //disable submit button
        this.setState({ isSubmitting : true });

        //save to firebase
        this.saveProduct();

        e.preventDefault();
    }

    onDrop(acceptedFiles){
        //accepted file
        const maxFileSize = 1000000; //1MB
        const allowedType = ['image/jpeg', 'image/png'];

        //is allowed to upload more image
        if(this.state.imageLeft > 0){
            //ok
            this.setState({errorMessage : ''});

            acceptedFiles.map(file => {
                if(file.size > 0 && file.size <= maxFileSize && allowedType.includes(file.type)){
                    //read file
                    const reader = new FileReader();
    
                    //add reader load listener
                    reader.addEventListener("load", () => {
                        this.addImageToDisplay(reader.result);
                    }, false);
    
                    //load as base64
                    reader.readAsDataURL(file);
                }else{
                    //error
                    this.setState({errorMessage : 'maximun image size: 1MB, allowed type: jpeg|png'});
                }
            })
        }else{
            //error
            this.setState({errorMessage : 'you have reached maximum image uploads.'});
        }
    }

    addImageToDisplay(imageBase64){
        let setToImage = 0;
        //check should be uploaded to image1/2/3
        if(Object.keys(this.state.image1).length < 1){
            //set to image 1
            setToImage = 1;
        }else if(Object.keys(this.state.image2).length < 1){
            //set to image 2
            setToImage = 2;
        }else if(Object.keys(this.state.image3).length < 1){
            //set to image 3
            setToImage = 3;
        }

        //add to images state
        let key = setToImage;
        let imageObj = {
            key : key,
            src : imageBase64,
            isUploading : true,
            uploadedPercent : 0,
            url: ''
        };

        //set state, update only current image active
        this.updateImage(setToImage, imageObj);

        //upload image to storage
        //firebase storage
        const storage = firebase.storage().ref();
        let imageName = Date.now()+".jpg";
        console.log(imageName);
        let uploadTask = storage.child('images/'+imageName).putString(imageBase64, 'data_url');
        //listen upload task
        uploadTask.on('state_changed', snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
            //update images obj
            imageObj.uploadedPercent = Math.round(progress);
            //update state
            this.updateImage(setToImage, imageObj);

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
            }
        }, (err) => {
            // Handle unsuccessful uploads
            console.log(err.message);
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                //update images
                imageObj.url = downloadURL;
                imageObj.isUploading = false;
                //update state
                this.updateImage(setToImage, imageObj);

                //decrease image left
                this.setState({ imageLeft : this.state.imageLeft - 1 });
            });
        });
    }

    updateImage(onImage, imageObj){
        if(onImage==1){
            this.setState({ image1 :  imageObj });
        }else if(onImage==2){
            this.setState({ image2 :  imageObj });
        }else if(onImage==3){
            this.setState({ image3 :  imageObj });
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h3 className="title">Add New Product</h3>
                <ResponseMessage isSuccess={this.state.isSuccess} errorMessage={this.state.errorMessage}/>
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-6">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input type="text" className="form-control" value={this.state.productName} onChange={this.handleProductNameChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Product Category *</label>
                            <select className="form-control" onChange={this.handleProductCategoryChange} required>
                                {this.state.categories.map((category) => 
                                    <option key={category.key} value={category.value}>{category.display}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Product Description *</label>
                            <textarea className="form-control" maxLength="1000" value={this.state.productDescription} onChange={this.handleProductDescriptionChange}/>
                            <div className="help">maximum character 1000</div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-6">
                        <label>Product Images</label>
                        <br/>
                        <Dropzone onDrop={this.onDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="add-file">
                                        <i className="fa fa-file"></i>
                                        <p align="center">Drag and Drop files here...</p>
                                    </div>
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className="help">{ this.state.imageLeft } image left</div>
                        <div className="images-preview">
                            <label>Preview:</label>
                            <br/>
                            <ImagePreview image={this.state.image1}/>
                            <ImagePreview image={this.state.image2}/>
                            <ImagePreview image={this.state.image3}/>
                            {/* {this.state.images.map(image => <ImagePreview image={image}/> )} */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Link to="/" className="btn btn-warning">Cancel</Link>
                        &nbsp;
                        <SubmitButton isSubmitting={this.state.isSubmitting}/>
                    </div>
                </div>
            </form>
        );
    }
}

function ImagePreview(props){
    if(Object.keys(props.image).length > 0){
        if(props.image.isUploading){
            //show loading
            return(
                <div key={props.image.key} className="image-container">
                    <div className="image-loading">Uploading<br/>{props.image.uploadedPercent} %</div>
                </div>
            );
        }else{
            //show image preview
            return(
                <div key={props.image.key} className="image-container">
                    <img className="image-preview" src={props.image.url}></img>
                </div>
            );
        }
    }else{
        return (<div></div>);
    }
}

function ResponseMessage(props){
    if(props.isSuccess){
        return (<div className="alert alert-success"><i className="fa fa-check-circle"></i> Data successfully added! <Link to='/'>Go To List</Link></div>);
    }

    if(props.errorMessage!==''){
        return(<div className="alert alert-danger"><i className="fa fa-info-circle"></i> {props.errorMessage}</div>);
    }

    return('');
}

function SubmitButton(props){
    if(props.isSubmitting){
        //show loading
        return(<button type="button" className="btn btn-primary" disabled>Please Loading...</button>);
    }else{
        //show submit btn
        return(<button type="submit" className="btn btn-primary">Submit</button>);
    }
}

export default AddProduct;