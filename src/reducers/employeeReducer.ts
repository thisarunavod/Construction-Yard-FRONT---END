import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Employee from "../model/employee.ts"; // Import the Employee model
import { refreshToken } from "./userReducer.ts";

const api = Axios.create({
    baseURL: "http://localhost:3000",
});

// Fetch all employees
export const getAllEmployees = createAsyncThunk(
    "employees/GetAllEmployees",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/employee/getAllEmployees', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch employees:", err);
            throw err;
        }
    }
);

// Add a new employee
export const addEmployee = createAsyncThunk(
    "employees/AddEmployee",
    async (employee: Employee, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/employee/addEmployee', employee, {
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
                        const retryResponse = await api.post('/employee/addEmployee', employee, {
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

// Update an employee
export const updateEmployee = createAsyncThunk(
    "employees/UpdateEmployee",
    async (employee: Employee) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.put(`/employee/updateEmployee/${employee.e_id}`, employee, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update employee:", err);
            throw err;
        }
    }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
    "employees/DeleteEmployee",
    async (eId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/employee/deleteEmployee/${eId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Return the ID of the deleted employee
        } catch (err) {
            console.error("Failed to delete employee:", err);
            throw err;
        }
    }
);

const initialState: Employee[] = [];

const employeeSlice = createSlice({
    name: 'employeeReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                return action.payload; // Replace the state with the fetched employees
            })

            .addCase(addEmployee.fulfilled, (state, action) => {
                state.push(action.payload); // Add the new employee to the state
            })

            .addCase(updateEmployee.fulfilled, (state, action) => {
                const updatedEmployee = action.payload;
                const index = state.findIndex(e => e.e_id === updatedEmployee.e_id);
                if (index !== -1) {
                    state[index] = updatedEmployee; // Update the employee in the state
                }
            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {
                return state.filter(e => e.e_id !== action.payload); // Remove the deleted employee
            });
    }
});

export default employeeSlice.reducer;