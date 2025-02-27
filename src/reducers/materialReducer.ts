import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Material from "../model/Material.ts";
import Axios from "axios";
import {refreshToken} from "./userReducer.ts";
import {act} from "react";
// import api from "../api/interceptors.ts";


const api = Axios.create({
    baseURL: "http://localhost:3000",
})

export const deleteMaterial= createAsyncThunk(
    'material/delete',
    async (id:string)=>{
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) { throw new Error("No authentication token found"); }
            // Make the API request with the authorization header
            const response = await api.delete(
                `/material/deleteMaterial/${id}`,
                {
                    headers: {Authorization: `Bearer ${token}`, // Include the token in the authorization header
                    },
                });
            return response.data;
        }catch (err){
            alert(err)
        }
    }
)

export const addMaterial = createAsyncThunk(
    "materials/AddMaterials",
    async (material: Material, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) { throw new Error("No authentication token found"); }
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
            if (err.response?.status === 401) {
                // Token might be expired, try refreshing it
                try {
                    const newToken = await refreshToken(); // Refresh the token
                    if (newToken) {
                        // Retry the request with the new token
                        const retryResponse = await api.post('/material/addMaterial', material, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        });
                        return retryResponse.data;
                    }
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                    return rejectWithValue(refreshError.response?.data || refreshError.message);
                }
            }
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateMaterial = createAsyncThunk(
    "materials/UpdateMaterials",
    async (material: Material) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) { throw new Error("No authentication token found"); }
            // Make the API request with the authorization header
            const response = await api.put(
                `/material/updateMaterial/${material.material_id}`,
                material,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            return response.data
            /*const response = await api.post('/material/addMaterial', material)
            return response.data;*/
        } catch (err) {
            alert(err)
        }
    }
)


export const getAllMaterials = createAsyncThunk(
    "materials/GetAllMaterials",
    async ()=>{
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) { throw new Error("No authentication token found"); }
            // Make the API request with the authorization header
            const response = await api.get(
                '/material/getAllMaterial',
                {
                    headers: {Authorization: `Bearer ${token}`,},
                });
            return response.data;
        }catch (err){
            console.log(err)
        }
    }
)

const initialState:Material[] = [] ;

const materialSlice = createSlice({
    name:'materialReducer',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(addMaterial.pending, (state, action) => {

            })
            .addCase(addMaterial.fulfilled, (state, action) => {
                console.log('Material added successfully !!')
                state.push(action.payload)
            })
            .addCase(addMaterial.rejected, (state, action) => {

            })

            .addCase(getAllMaterials.pending, (state) => {

            })
            .addCase(getAllMaterials.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(getAllMaterials.rejected, (state, action) => {

            })

            .addCase(updateMaterial.pending, (state, action) => {

            })
            .addCase(updateMaterial.fulfilled, (state, action) => {
                const updatedMaterial = action.payload
                const index = state.findIndex((material)=>material.material_id == updatedMaterial.material_id)
                if (index !== -1){ state[index] = updatedMaterial}
                alert("Successfully Updated")
            })
            .addCase(updateMaterial.rejected, (state, action) => {

            })

            /*delete material*/
            .addCase(deleteMaterial.pending, (state, action) => {

            })
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                const deletedId = action.payload
                return state.filter((material)=> material.material_id != deletedId)
            })
            .addCase(deleteMaterial.rejected, (state, action) => {

            })

    }
})


export default materialSlice.reducer;