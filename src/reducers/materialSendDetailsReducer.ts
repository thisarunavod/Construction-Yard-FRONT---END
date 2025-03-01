import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import MaterialSendDetails from "../model/materialSendDetails.ts"; // Import the MaterialSendDetailsPage model
import { refreshToken } from "./userReducer.ts";

const api = Axios.create({
    baseURL: "http://localhost:3000",
});

// Fetch all material send details
export const getAllMaterialSendDetails = createAsyncThunk(
    "materialSend/GetAllMaterialSendDetails",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/material/getAllMaterialSendDetails', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch material send details:", err);
            throw err;
        }
    }
);

// Add new material send details
export const addMaterialSendDetails = createAsyncThunk(
    "materialSend/AddMaterialSendDetails",
    async (details: MaterialSendDetails, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/material/addMaterialSendDetails', details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            if (err.response?.status === 401) {
                try {
                    const newToken = await refreshToken();
                    if (newToken) {
                        const retryResponse = await api.post('/material/addMaterialSendDetails', details, {
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

// Update material send details
export const updateMaterialSendDetails = createAsyncThunk(
    "materialSend/UpdateMaterialSendDetails",
    async (details: MaterialSendDetails) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.put(`/material/updateMaterialSendDetails/${details.issue_id}`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update material send details:", err);
            throw err;
        }
    }
);

// Delete material send details
export const deleteMaterialSendDetails = createAsyncThunk(
    "materialSend/DeleteMaterialSendDetails",
    async (issueId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/material/deleteMaterialSendDetails/${issueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return issueId; // Return the ID of the deleted details
        } catch (err) {
            console.error("Failed to delete material send details:", err);
            throw err;
        }
    }
);

const initialState: MaterialSendDetails[] = [];

const materialSendDetailsSlice = createSlice({
    name: 'materialSendReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllMaterialSendDetails.fulfilled, (state, action) => {
                return action.payload; // Replace the state with the fetched details
            })
            .addCase(addMaterialSendDetails.fulfilled, (state, action) => {
                state.push(action.payload); // Add the new details to the state
            })
            .addCase(updateMaterialSendDetails.fulfilled, (state, action) => {
                const updatedDetails = action.payload;
                const index = state.findIndex(d => d.issue_id === updatedDetails.issue_id);
                if (index !== -1) {
                    state[index] = updatedDetails; // Update the details in the state
                }
            })
            .addCase(deleteMaterialSendDetails.fulfilled, (state, action) => {
                return state.filter(d => d.issue_id !== action.payload); // Remove the deleted details
            });
    }
});

export default materialSendDetailsSlice.reducer;