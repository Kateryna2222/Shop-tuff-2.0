import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${BASE_URL}/products`);
            if(!res.ok){
                throw new Error('Server error')
            }
            const data = await res.json();
            return data
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (productId, thunkAPI) => {
        try {
            const res = await fetch(`${BASE_URL}/products/${productId}`);
            if (!res.ok) {
                throw new Error('Product not found');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: true,
        products: [],
        filteredProduct: [],
        currentProduct: null,
        currentImg: 0,
        relatedProducts: [],
    },
    reducers: {
        filterByPrice: (state, {payload})=>{
            state.filteredProduct = state.products.filter(item => item.price < payload)
        },
        filterByCategory: (state, {payload}) => {
            state.relatedProducts = state.products.filter(item => item.category.name === payload)
        },
        changeCurrentImg: (state, {payload}) => {
            state.currentImg = payload
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getProducts.fulfilled, (state, {payload}) => {
            state.products = payload;
        })
        builder.addCase(getProductById.fulfilled, (state, {payload}) => {
            state.currentProduct = payload;
            state.currentImg = 0;
            state.loading = false
        })
    },
})

export const {filterByPrice, filterByCategory, changeCurrentImg} = productsSlice.actions;
export default productsSlice.reducer;