import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL} from "../utils/constants"
import axios from "axios";
import { storage } from "../storage/storage";

export const createUser = createAsyncThunk(
    'user/createUser',
    async (payload, thunkAPI) => {
        try{
            const {data} = await axios.post(`${BASE_URL}/users`, payload);
            return data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
)


export const getToken = createAsyncThunk(
    'user/getToken',
    async (payload, thunkAPI) => {
        try{
            const {data} = await axios.post(`${BASE_URL}/auth/login`, payload);

            if(!data.access_token){
                throw new Error('Access token not found');
            }

            storage.setItem('TOKEN', data.access_token);
            return data.access_token

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong")
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (payload, thunkAPI) => {
        try{
            const response = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${payload}` },
            });
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong")
        }
    }
)


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async function({id, upadateValues}, thunkAPI) {
        try{
            const request = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(upadateValues),
            })

            if(!request.ok){
                throw new Error(`Failed to update user`);
            }
            const data = await request.json()
            return data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        isUser: false,
        authError: false,
        isToken: false
    },
    reducers: {
        logOut: (state)=>{
            state.currentUser = {},
            state.isUser = false
            storage.removeItem('TOKEN')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload;
            state.isUser = true;
            state.authError = false;
            state.isToken = true;
        })
        builder.addCase(getToken.fulfilled, (state)=>{
            state.isUser = true;
            state.authError = false;
        })
        builder.addCase(getToken.rejected, (state)=>{
            state.authError = true;
            alert(`Something went wrong`);
        })
        builder.addCase(loginUser.fulfilled, (state, {payload})=>{
            state.currentUser = payload;
            state.isUser = true;
            state.authError = false;
        })
        builder.addCase(updateUser.fulfilled, (state, {payload})=>{
            state.currentUser = {...state.currentUser, ...payload};
        })
    }
})

export const {logOut} = userSlice.actions;
export default userSlice.reducer;