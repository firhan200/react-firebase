import { IS_AUTHENTICATED, LOGIN, LOGOUT } from '../actions/actionTypes';

const initialState = {
    isAuthenticated : false,
    user: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case IS_AUTHENTICATED:
            return Object.assign(
                {},
                state
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