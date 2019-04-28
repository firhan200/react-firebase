import { ADD_TO_CART, REMOVE_FROM_CART, INIT_CART_FROM_LOCATSTORAGE } from '../actions/actionTypes';
import { CART_KEY } from '../../constants/userLocalStorageKeys';

const getCartFromLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem(CART_KEY))
    if(cart!==null){
        cart = cart.items;
    }else{
        cart = [];
    }

    return cart;
}

const initialState = {
    items: getCartFromLocalStorage(),
    lastInsertedItem : {}
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return Object.assign(
                {},
                state,
                {
                    items : Object.assign([], state.items).concat(action.payload),
                    lastInsertedItem: action.payload
                }
            );
        case REMOVE_FROM_CART:
            return Object.assign(
                {},
                state,
                {
                    items : Object.assign([], state.items).filter(item => { return item.id!==action.payload }),
                    lastInsertedItem: {}
                }
            );
        case INIT_CART_FROM_LOCATSTORAGE:
            console.log("from:");
            console.log(state.items);
            console.log("to:");
            console.log(action.payload);
            return Object.assign(
                {},
                state,
                {
                    items : action.payload,
                    lastInsertedItem: state.lastInsertedItem
                }
            );
        default:
            return initialState;
    }
}