import { IS_AUTHENTICATED, LOGIN, LOGOUT } from '../actions/actionTypes';
import { USER_KEY } from '../../constants/userLocalStorageKeys';

const authenticatingFromLocalStorage = () => {
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    let isAuthenticated = false;
    if(user!==null){
        isAuthenticated = true;
    }

    return isAuthenticated;
}

const initialState = {
    isAuthenticated : authenticatingFromLocalStorage(),
    user: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case IS_AUTHENTICATED:
            return Object.assign(
                {},
                state,
                {
                    isAuthenticated: action.payload
                }
            )
        case LOGIN:
            return Object.assign(
                {},
                state,
                {
                    isAuthenticated: true,
                    user: action.payload
                }
            )
        case LOGOUT:
            return Object.assign(
                {},
                state,
                {
                    isAuthenticated: false,
                    user: {}
                }
            )
        default:
            return (state);
    }
}