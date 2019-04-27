import { IS_AUTHENTICATED, LOGIN, LOGOUT } from './actionTypes'
import { USER_KEY } from '../../constants/userLocalStorageKeys';
import firebase from 'firebase';

export const login = (content, callBack) => {
    // user signed up success
    localStorage.setItem(USER_KEY, JSON.stringify(content));
    let user = localStorage.getItem(USER_KEY);

    callBack();

    //return
    return {
        type: LOGIN,
        payload: user
    }
}

export const logout = (callBack) => dispatch => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.removeItem(USER_KEY);
        
        //dispatch store
        dispatch({
            type: LOGOUT
        });

        //execute callback
        callBack();
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });	
}

export const isAuthenticated = () => {
    let isLocalStorageContainUser = false;
    let user = localStorage.getItem(USER_KEY);
    console.log(user);
    if(user!==null){
        //un authenticated
        isLocalStorageContainUser = true;
    }

    return {
        type: IS_AUTHENTICATED,
        payload : isLocalStorageContainUser
    }
}