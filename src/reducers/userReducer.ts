import {asyncThunkCreator, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios, {AxiosError, AxiosHeaders} from "axios";
import jwt, {decode, JwtPayload} from "jsonwebtoken";
import {jwtDecode} from 'jwt-decode'


export const initialState = {
    securityTokens: null,
    decodedToken: null, // Add a state to store the decoded token
}

const api = Axios.create({
    baseURL: "http://localhost:3000",
})


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

                // const user = jwtDecode(action.payload.accessToken)
                // console.log(localStorage.getItem('token'))

            })
            .addCase(loginUser.rejected, (state, action) => {
                // console.log('login  Error');
                alert('login  Error')
                console.log(action.payload)
            })
    }

})
export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;