import { createSlice } from "@reduxjs/toolkit";


const likedSlice = createSlice({
    name: "liked",
    initialState: {
        likedProducts: [],
    },
    reducers: {
        toggleLike: (state, {payload})=>{
            const isLiked = state.likedProducts.some(item => item.id === payload.id)
            if(isLiked){
                state.likedProducts = state.likedProducts.filter(item => item.id !== payload.id);
            }
            else{
                state.likedProducts.unshift(payload)
            }
        },
    }
})

export const {toggleLike} = likedSlice.actions;
export default likedSlice.reducer;