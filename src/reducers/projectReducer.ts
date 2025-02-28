import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Material from "../model/Material.ts";
import {refreshToken} from "./userReducer.ts";
import Axios from "axios";
import ProjectDetails from "../model/projectDetails.ts";
import {act} from "react";


const api = Axios.create({
    baseURL: "http://localhost:3000",
})


export const getALlProjects = createAsyncThunk(
    "projects/GetAllProjects",
    async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) {
                throw new Error("No authentication token found");
            }
            // Make the API request with the authorization header
            const response = await api.get(
                '/project/getAllProject',
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the authorization header
                    },
                });
            return response.data;

        } catch (err) {
            alert(err)
        }
    }
)

export const loadALlProjectsMaterialRequirements = createAsyncThunk(
    "projects/ALlProjectsMaterialRequirements",
    async () => {
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) {
                throw new Error("No authentication token found");
            }
            // Make the API request with the authorization header
            const response = await api.get(
                '/project/getAllProjectMaterialRequirements',
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the authorization header
                    },
                });
            return response.data;

        } catch (err) {
            alert(err)
        }
    }
)


export const addProject = createAsyncThunk(
    "projects/AddProjects",
    async (projectDetails:ProjectDetails, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken'); // Replace "authToken" with your actual token key
            if (!token) { throw new Error("No authentication token found"); }
            // Make the API request with the authorization header
            const response = await api.post(
                '/project/addProject',
                projectDetails,
                {
                    headers: {Authorization: `Bearer ${token}`, // Include the token in the authorization header
                    },
                });
            return response.data;

        } catch (err) {
            alert(err)
            /*if (err.response?.status === 401) {
                // Token might be expired, try refreshing it
                try {
                    const newToken = await refreshToken(); // Refresh the token
                    if (newToken) {
                        // Retry the request with the new token
                        const retryResponse = await api.post('/project/addProject', projectDetails, {
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
            return rejectWithValue(err.response?.data || err.message);*/
        }
    }
);

const initialState:any = {
    projects: [],
    requirements: [],
}


const projectSlice = createSlice({
    name:'projectReducer',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(addProject.pending, (state, action) => {})
            .addCase(addProject.fulfilled, (state, action) => {
                console.log('Project added successfully !!')
                state.projects.push(action.payload)
            })
            .addCase(addProject.rejected, (state, action) => {})



            .addCase(getALlProjects.pending, (state, action) => {})
            .addCase(getALlProjects.fulfilled, (state, action) => {
                state.projects = action.payload
            })
            .addCase(getALlProjects.rejected, (state, action) => {})



            .addCase(loadALlProjectsMaterialRequirements.pending, (state, action) => {})
            .addCase(loadALlProjectsMaterialRequirements.fulfilled, (state, action) => {
                state.requirements = action.payload
            })
            .addCase(loadALlProjectsMaterialRequirements.rejected, (state, action) => {})
    }
})

export default projectSlice.reducer;