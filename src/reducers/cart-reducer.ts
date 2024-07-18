import { db } from "../helpers/db";
import { cartItem, guitarItem } from "../types";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: guitarItem} } |
    { type: 'increase-item', payload: {item: guitarItem['id']} } |
    { type: 'decrease-item', payload: {item: guitarItem['id']} } |
    { type: 'remove-item', payload: {item: guitarItem['id']} } |
    { type: 'clear-cart' }

export type CartState = {
    data: guitarItem[]
    cart: cartItem[]
}

const initialCart = () : cartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

    if(action.type === "add-to-cart" ) {
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updatedCart : cartItem[] = []
        if (itemExists) { 
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id) {
                    if(item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
           })
        } else {
            const newItem : cartItem = {...action.payload.item, quantity : 1}
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }
    if(action.type === "increase-item"){
        const itemExists = state.cart.find(guitar=>guitar.id === action.payload.item)
        if(itemExists && itemExists.quantity<MAX_ITEMS){
        let updatedCart : cartItem[] = []
            updatedCart = state.cart.map(guitar=>guitar.id === action.payload.item ? {...guitar,quantity:guitar.quantity+1} : guitar )
            return{
                ...state,
                cart:updatedCart
            }
        }
    }
    if(action.type === "decrease-item"){
        const itemExists = state.cart.find(guitar=>guitar.id === action.payload.item)
        if(itemExists && itemExists.quantity>MIN_ITEMS){
        let updatedCart : cartItem[] = []
            updatedCart = state.cart.map(guitar=>guitar.id === action.payload.item ? {...guitar,quantity:guitar.quantity-1} : guitar )
            return{
                ...state,
                cart:updatedCart
            }
        }
    }
    if (action.type === "remove-item") {
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item);
        if (itemExists) {
            const updatedCart = state.cart.filter(guitar => guitar.id !== action.payload.item);
            return {
                ...state,
                cart: updatedCart
            };
        }
    }
    
    if(action.type === "clear-cart") {

        return {
            ...state,
            cart:[]
        }
    }

    return state
}