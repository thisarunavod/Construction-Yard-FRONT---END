import {asyncThunkCreator, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios, {AxiosError, AxiosHeaders} from "axios";
import jwt, {decode, JwtPayload} from "jsonwebtoken";
import {jwtDecode} from 'jwt-decode'
import User from "../model/user.ts";


export const initialState:any = {
    securityTokens: null,
    decodedToken: null,
    users:[]
}

const api = Axios.create({
    baseURL: "http://localhost:3000",
})
export const addUser = createAsyncThunk(
    "user/addUser",
    async(user:User)=>{
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/auth/register',user,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }catch (err){
            alert(err)
        }
    }
)
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async()=>{
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/user/getAllUsers',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }catch (err){

        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async(id:string)=>{
        console.log(id)
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/user/deleteUser/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }catch (err){

        }
    }
)
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async(user:User)=>{
        try {

        }catch (err){

        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (user:{username:string,password:string})=>{
        console.log(user)
        try {
            const response =await api.post('/auth/login',{
                username:user.username,
                password:user.password
            });
            return response.data;
        }catch(err: any){
            alert(err.message)
        }
    }
)

export const refreshToken = async () => {

    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) { throw new Error("Refresh token not found");}

        // Send refreshToken in the Authorization header
        const response = await api.post('/auth/refresh-token', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    } catch (err) {
        console.error("Failed to refresh token:", err);
        window.location.href = "/";

    }
};


const userSlice = createSlice({
    name:'userReducer',
    initialState,
    reducers:{
        logoutUser: (state) => {
            state.securityTokens = null;
            state.decodedToken = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                console.log('pending login');
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.securityTokens = action.payload
                localStorage.setItem('accessToken',action.payload.accessToken)
                localStorage.setItem('refreshToken',action.payload.refreshToken)
            })
            .addCase(loginUser.rejected, (state, action) => {
                alert('login  Error')
                console.log(action.payload)
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                console.log(action.payload)
                state.users = action.payload
            })
            .addCase(addUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.users.push(action.payload)
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                return state.users.filter(u => u.id !== action.payload);
            })
    }

})
export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;