import { createSlice } from "@reduxjs/toolkit";


const busketSlice = createSlice({
    name: "busket",
    initialState: {
        productsInBusket: [],
        total: 0,
    },
    reducers: {
        toggleBusket: (state, {payload})=>{
            const isInBusket = state.productsInBusket.some(product => product.id === payload.id)
            if(isInBusket){
                state.productsInBusket = state.productsInBusket.filter(product => product.id !== payload.id);
                state.total = state.total - (payload.count * payload.price);
            }
            else{
                state.productsInBusket.push(payload);
                state.total = state.total + (payload.count * payload.price);
            }
        },
        removeFromBusket: (state, {payload})=>{
            state.productsInBusket = state.productsInBusket.filter(product => product.id !== payload.id);
            state.total = state.total - (payload.count * payload.price);
        },
        increaseTotal: (state, {payload})=>{
            const oldTotalState = state.total - (payload.count * payload.price)
            const product = state.productsInBusket.find(item => item.id === payload.id)
            if(product){
                product.count++;
            }
            state.total = oldTotalState + (product.count * product.price);
        },
        disreaseTotal: (state, {payload})=>{
            const oldTotalState = state.total - (payload.count * payload.price)
            const product = state.productsInBusket.find(item => item.id === payload.id)
            if(product && product.count > 1){
                product.count--;
            }
            state.total = oldTotalState  + (product.count * payload.price);
        },
    }
})


export const {toggleBusket, removeFromBusket, increaseTotal, disreaseTotal} = busketSlice.actions;
export default busketSlice.reducer;