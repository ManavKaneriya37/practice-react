import { createSlice } from "@reduxjs/toolkit";
import items from "../items";

const CartData = localStorage.getItem("CartData") !== null ? JSON.parse(localStorage.getItem("CartData")) : [];
const CartTotal = localStorage.getItem("CartTotal") !== null ? JSON.parse(localStorage.getItem("CartTotal")) : 0;
const CartQty = localStorage.getItem("CartQty") !== null ? JSON.parse(localStorage.getItem("CartQty")) : 0;

const initialState = {
    cart: CartData,
    items: items,
    totalQuantity: CartQty,
    totalPrice: CartTotal,
};

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers:{
        addToCart: (state,action) => {
            const find = state.cart.findIndex(item => item.id === action.payload.id);
            if(find >= 0)
            {
                state.cart[find].qty += 1; 
            }
            else{
                state.cart.push(action.payload);
            }
            localStorage.setItem("CartData",JSON.stringify(state.cart));
            localStorage.setItem("CartQty",JSON.stringify(state.totalQuantity));
        },
        getCartTotal: (state) => {
            const {totalQuantity, totalPrice} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, qty} = cartItem;
                const itemTotal = price * qty;
                cartTotal.totalPrice += itemTotal;
                cartTotal.totalQuantity += qty;

                localStorage.setItem("CartTotal",JSON.stringify(cartTotal.totalPrice));
                localStorage.setItem("CartQty",JSON.stringify(cartTotal.totalQuantity));
                return cartTotal;
            },
            {
                totalPrice: 0,
                totalQuantity: 0
            }
        )

        state.totalPrice = parseInt(totalPrice.toFixed(2))
        state.totalQuantity = totalQuantity; 
        },
        deleteItem: (state,action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem("CartData",JSON.stringify(state.cart.filter(item => item.id !== action.payload)));
        },
        increaseItemQty: (state,action) => {
            const incIndex = state.cart.findIndex(item => item.id === action.payload);
            state.cart[incIndex].qty += 1;
            localStorage.setItem("CartData",JSON.stringify(state.cart));
        },
        decreaseItemQty: (state, action) => {
            const decIndex = state.cart.findIndex(item => item.id === action.payload);
            if(state.cart[decIndex].qty > 1){
                state.cart[decIndex].qty -= 1;
                localStorage.setItem("CartData",JSON.stringify(state.cart));
            }
        },
    }
})

export default itemSlice.reducer;

export const {addToCart, getCartTotal, deleteItem, increaseItemQty, decreaseItemQty} = itemSlice.actions;