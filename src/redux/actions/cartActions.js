import { ADD_TO_CART, REMOVE_FROM_CART, INIT_CART_FROM_LOCATSTORAGE, UPDATE_CART_ITEM } from './actionTypes';
import { CART_KEY } from '../../constants/userLocalStorageKeys';
import { toast } from 'react-toastify';

export const addToCart = (product, callBack) => dispatch => {
    let isAddToCart = false;
    let itemId = product.key;
    let productName = product.name;
    let cart = JSON.parse(localStorage.getItem(CART_KEY));

    let currentItem = {
        id : itemId,
        quantity : 0,
        total : 0
    }

    if(cart!==null){
        //cart exist, check if id already in cart
        let itemExist = cart.items.filter(item => { return item.id===currentItem.id });
        if(itemExist.length < 1){
            //item not in cart, add
            cart.items.push(currentItem);
            isAddToCart = true;
        }
    }else{
        //cart is empty
        cart = { items: [currentItem] };
        isAddToCart = true;
    }

    //convert cart object to string
    cart = JSON.stringify(cart);
    //save to local storage
    localStorage.setItem(CART_KEY, cart);

    //item added to cart?
    if(isAddToCart){
        dispatch({
            type: ADD_TO_CART,
            payload: currentItem
        })

        toast.info("Added "+productName+" to cart!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }else{
        toast.error(productName+" already in cart!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export const removeFromCart = item => {
    let isRemoved = false;
    let itemId = item.key;
    let cart = JSON.parse(localStorage.getItem(CART_KEY));

    if(cart!==null){
        console.log(itemId);
        //cart exist
        //find itemId
        let newCartItems = cart.items.filter(item => {
            return item.id!==itemId;
        });

        if(newCartItems.length!==cart.items.length){
            //something removed
            isRemoved = true;
        }

        cart = { items: newCartItems }

        localStorage.setItem(CART_KEY , JSON.stringify(cart));
    }

    if(isRemoved){
        //show toast
        toast.error(item.name+" removed from cart!", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    return {
        type: REMOVE_FROM_CART,
        payload: itemId
    }
}

export const initCartItems = () => dispatch => {
    let cart = JSON.parse(localStorage.getItem(CART_KEY));

    if(cart!==null){
        dispatch({
            type: INIT_CART_FROM_LOCATSTORAGE,
            payload: cart.items
        });
    }
}

export const updateCartItem = (content) => {
    let cart = JSON.parse(localStorage.getItem(CART_KEY));

    if(cart!==null){
        //cart exist
        //find itemId
        let newCartItems = cart.items.map(item => {
            if(item.id===content.id){
                item = content;
            }

            return item;
        });

        //update cart
        cart = { items: newCartItems }

        //set to local storage
        localStorage.setItem(CART_KEY , JSON.stringify(cart));
    }

    return {
        type: UPDATE_CART_ITEM,
        payload: content
    }
}