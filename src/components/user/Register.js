import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';

class Register extends Component{
    loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            //call redux
            this.props.login(user, () => {
                this.props.history.push('/');
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            // ...
        });
    }

    loginWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            //call redux
            this.props.login(user);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage);
            // ...
        });	
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn full btn-sm btn-google" onClick={this.loginWithGoogle}>Login with Google</button>
                </div>
                <div className="col-md-6">
                    <button type="button" className="btn full btn-sm btn-facebook" onClick={this.loginWithFacebook}>Login with Facebook</button>
                </div>
            </div>
        );
    }
}

export default connect(null, { login })(Register);