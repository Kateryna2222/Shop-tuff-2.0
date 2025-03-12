import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import categoriesSlice from "../store/categoriesSlice";
import productsSlice from "../store/productsSlice";
import likedSlice from "../store/likedSlice";
import busketSlice from "../store/busketSlice";

const rootReducer = combineReducers({
    user: userSlice,
    categories: categoriesSlice,
    products: productsSlice,
    liked: likedSlice,
    busket: busketSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store;