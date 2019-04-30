import { ADD_TO_CART, REMOVE_FROM_CART, INIT_CART_FROM_LOCATSTORAGE, UPDATE_CART_ITEM, ADD_DISCOUNT, REMOVE_DISCOUNT } from '../actions/actionTypes';
import { CART_KEY } from '../../constants/userLocalStorageKeys';

let cartItems = [];
let discounts = [];

const getCartFromLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem(CART_KEY))
    if(cart!==null){
        if(typeof cart.items !== 'undefined'){
            cartItems = cart.items;
        }else{
            cartItems = [];
        }
        
        if(typeof cart.discounts !== 'undefined'){
            discounts = cart.discounts;
        }else{
            discounts = [];
        }
    }else{
        cartItems = [];
        discounts = [];
    }

    return true;
}

getCartFromLocalStorage();

const initialState = {
    items: cartItems,
    discounts: discounts,
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
            return Object.assign(
                {},
                state,
                {
                    items : action.payload
                }
            );
        case UPDATE_CART_ITEM:
            return Object.assign(
                {},
                state,
                {
                    items: Object.assign(state.items).map(item => {
                        let temp = Object.assign({}, item);
                        if(temp.id===action.payload.id){
                            temp = action.payload;
                        }

                        return temp;
                    })
                }
            );
        case ADD_DISCOUNT:
            return Object.assign(
                {},
                state,
                {
                    discounts: [action.payload]
                }
            );
        case REMOVE_DISCOUNT:
        console.log(state.discounts);
            return Object.assign(
                {},
                state,
                {
                    discounts: Object.assign([], state.discounts).filter(discount => { return discount.id!==action.payload.id })
                }
            );
        default:
            return initialState;
    }
}