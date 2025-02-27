import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Supplier from "../model/supplier.ts";
import { refreshToken } from "./userReducer.ts";

const api = Axios.create({
    baseURL: "http://localhost:3000",
});

// Fetch all suppliers
export const getAllSuppliers = createAsyncThunk(
    "suppliers/GetAllSuppliers",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/supplier/getAllSuppliers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch suppliers:", err);
            throw err;
        }
    }
);

// Add a new supplier
export const addSupplier = createAsyncThunk(
    "suppliers/AddSupplier",
    async (supplier: Supplier, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/supplier/addSupplier', supplier, {
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
                        const retryResponse = await api.post('/supplier/addSupplier', supplier, {
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

// Update a supplier
export const updateSupplier = createAsyncThunk(
    "suppliers/UpdateSupplier",
    async (supplier: Supplier) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.put(`/supplier/updateSupplier/${supplier.sup_id}`, supplier, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update supplier:", err);
            throw err;
        }
    }
);

// Delete a supplier
export const deleteSupplier = createAsyncThunk(
    "suppliers/DeleteSupplier",
    async (supId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/supplier/deleteSupplier/${supId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Return the ID of the deleted supplier
        } catch (err) {
            console.error("Failed to delete supplier:", err);
            throw err;
        }
    }
);

const initialState: Supplier[] = [];

const supplierSlice = createSlice({
    name: 'supplierReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllSuppliers.fulfilled, (state, action) => {
                return action.payload; // Replace the state with the fetched suppliers
            })

            .addCase(addSupplier.fulfilled, (state, action) => {
                state.push(action.payload); // Add the new supplier to the state
            })

            .addCase(updateSupplier.fulfilled, (state, action) => {
                const updatedSupplier = action.payload;
                const index = state.findIndex(s => s.sup_id === updatedSupplier.sup_id);
                if (index !== -1) {
                    state[index] = updatedSupplier; // Update the supplier in the state
                }
            })

            .addCase(deleteSupplier.fulfilled, (state, action) => {
                return state.filter(s => s.sup_id !== action.payload); // Remove the deleted supplier
            });
    }
});

export default supplierSlice.reducer;