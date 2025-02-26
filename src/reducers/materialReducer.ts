import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Material from "../model/Material.ts";
import Axios from "axios";

const api = Axios.create({
    baseURL: "http://localhost:3000",
})

export const addMaterial = createAsyncThunk(
    "materials/AddMaterials",
    async (material: Material, { rejectWithValue }) => {
        try {
            // Get the token from localStorage (or sessionStorage)
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key

            if (!token) {
                throw new Error("No authentication token found");
            }

            // Make the API request with the authorization header
            const response = await api.post(
                '/material/addMaterial',
                material,
                {
                    headers: {Authorization: `Bearer ${token}`, // Include the token in the authorization header
                },
            });

            return response.data;
        } catch (err) {
            // Use rejectWithValue to handle errors in a Redux-friendly way
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = { materials: [],}

const materialSlice = createSlice({
    name:'materialReducer',
    initialState,
    reducers:{},
    extraReducers: function (builder) {
        builder
            .addCase(addMaterial.pending, (state, action) => {

            })
            .addCase(addMaterial.fulfilled, (state, action) => {

            })
            .addCase(addMaterial.rejected, (state, action) => {

            })
    }
})


export default materialSlice.reducer;