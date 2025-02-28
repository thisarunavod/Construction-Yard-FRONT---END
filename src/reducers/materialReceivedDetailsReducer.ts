import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import MaterialReceivedDetails from "../model/materialReceivedDetails.ts";
import { refreshToken } from "./userReducer.ts";

const api = Axios.create({
    baseURL: "http://localhost:3000",
});

// Fetch all material received details
export const getAllMaterialReceivedDetails = createAsyncThunk(
    "materialReceived/GetAllMaterialReceivedDetails",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/material/getAllMaterialReceivedDetails', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch material received details:", err);
            throw err;
        }
    }
);

// Add new material received details
export const addMaterialReceivedDetails = createAsyncThunk(
    "materialReceived/AddMaterialReceivedDetails",
    async (details: MaterialReceivedDetails, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/material/addMaterialReceivedDetails', details, {
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
                        const retryResponse = await api.post('/material/addMaterialReceivedDetails', details, {
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

// Update material received details
export const updateMaterialReceivedDetails = createAsyncThunk(
    "materialReceived/UpdateMaterialReceivedDetails",
    async (details: MaterialReceivedDetails) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.put(`/materialReceived/updateMaterialReceivedDetails/${details.received_id}`, details, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update material received details:", err);
            throw err;
        }
    }
);

// Delete material received details
export const deleteMaterialReceivedDetails = createAsyncThunk(
    "materialReceived/DeleteMaterialReceivedDetails",
    async (receivedId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/materialReceived/deleteMaterialReceivedDetails/${receivedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return receivedId; // Return the ID of the deleted details
        } catch (err) {
            console.error("Failed to delete material received details:", err);
            throw err;
        }
    }
);

const initialState: MaterialReceivedDetails[] = [];

const materialReceivedSlice = createSlice({
    name: 'materialReceivedReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllMaterialReceivedDetails.fulfilled, (state, action) => {
                return action.payload; // Replace the state with the fetched details
            })
            .addCase(addMaterialReceivedDetails.fulfilled, (state, action) => {
                state.push(action.payload); // Add the new details to the state
            })
            .addCase(updateMaterialReceivedDetails.fulfilled, (state, action) => {
                const updatedDetails = action.payload;
                const index = state.findIndex(d => d.received_id === updatedDetails.received_id);
                if (index !== -1) {
                    state[index] = updatedDetails; // Update the details in the state
                }
            })
            .addCase(deleteMaterialReceivedDetails.fulfilled, (state, action) => {
                return state.filter(d => d.received_id !== action.payload); // Remove the deleted details
            });
    }
});

export default materialReceivedSlice.reducer;