import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from "axios";
import Vehicle from "../model/vehicle.ts"; // Import the Vehicle model
import {refreshToken} from "./userReducer.ts";
import Employee from "../model/employee.ts";

const api = Axios.create({
    baseURL: "http://localhost:3000",
});

// Fetch all vehicles
export const getAllVehicles = createAsyncThunk(
    "vehicles/GetAllVehicles",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/vehicle/getAllVehicle', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch vehicles:", err);
            throw err;
        }
    }
);
export const getAllDrivers = createAsyncThunk(
    "vehicles/GetAllDrivers",
    async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.get('/employee/getAllDrivers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch vehicles:", err);
            throw err;
        }
    }
);

// Add a new vehicle
export const addVehicle = createAsyncThunk(
    "vehicles/AddVehicle",
    async (vehicle: Vehicle, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.post('/vehicle/addVehicle', vehicle, {
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
                        const retryResponse = await api.post('/vehicle/addVehicle', vehicle, {
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

// Update a vehicle
export const updateVehicle = createAsyncThunk(
    "vehicles/UpdateVehicle",
    async (vehicle: Vehicle) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.put(`/vehicle/updateVehicle/${vehicle.v_id}`, vehicle, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update vehicle:", err);
            throw err;
        }
    }
);

// Delete a vehicle
export const deleteVehicle = createAsyncThunk(
    "vehicles/DeleteVehicle",
    async (vId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authentication token found");
            }
            const response = await api.delete(`/vehicle/deleteVehicle/${vId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data; // Return the ID of the deleted vehicle
        } catch (err) {
            console.error("Failed to delete vehicle:", err);
            throw err;
        }
    }
);

const initialState:any= {
    vehicles: [],
    availableDrivers:[]
};

const vehicleSlice = createSlice({
    name: 'vehicleReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                state.vehicles =  action.payload;
            })

            .addCase(getAllDrivers.fulfilled, (state, action) => {
                /*state.vehicles =  action.payload;*/

                const setupDriverIdlist:string[] =
                    state.vehicles.filter((vehicle)=> vehicle.e_id !== null).map(
                        (vehicle)=> vehicle.e_id
                    )
                const assignSet = new Set(setupDriverIdlist)

                const driverList:Employee[] =  action.payload
                state.availableDrivers = driverList.filter(
                    driver=> !assignSet.has(driver.e_id)
                )
                console.log(state.availableDrivers)

            })

            .addCase(addVehicle.fulfilled, (state, action) => {
                console.log(action.payload)
                state.vehicles.push(action.payload) ;
            })

            .addCase(updateVehicle.fulfilled, (state, action) => {
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex(v => v.v_id === updatedVehicle.v_id);
                if (index !== -1) {
                    state.vehicles[index] = updatedVehicle;
                }
            })

            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.vehicles = state.vehicles.filter(v => v.v_id !== action.payload)
            });
    }
});

export default vehicleSlice.reducer;