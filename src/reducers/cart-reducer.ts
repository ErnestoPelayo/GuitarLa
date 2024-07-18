import { db } from "../helpers/db";
import { cartItem, guitarItem } from "../types";

export type CartActions = 
    { type: 'add-to-cart', payload: {item: guitarItem} }

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

    return state
}