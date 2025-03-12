import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async function(_, thunkAPI) {
        try {
            const res = await fetch(`${BASE_URL}/categories?limit=5`)
            if(!res.ok){
                throw new Error('Server error')
            }
            const data = await res.json()
            return data
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getCategoriesById = createAsyncThunk(
    'categories/getCategoriesById',
    async function ({id, offset, price_min=1, price_max=10000, title=''}, thunkAPI) {
        try {

            const res = await fetch(`${BASE_URL}/products?price_min=${price_min}&${`price_max=${price_max}&`}offset=${offset}&limit=10&categoryId=${id}&title=${title}`)

            
            if(!res.ok){
                throw new Error('Server error')
            }
            const data = await res.json()
            return data
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        categoryProducts: [],
        categoryProductsLoad: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload
        })
        builder.addCase(getCategoriesById.fulfilled, (state, {payload}) => {
            state.categoryProducts = payload
            state.categoryProductsLoad = false
        })
        builder.addCase(getCategoriesById.pending, (state) => {
            state.categoryProductsLoad = true
        })
    }
})

export default categoriesSlice.reducer;