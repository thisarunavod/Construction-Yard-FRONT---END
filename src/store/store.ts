import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.ts";
import materialReducer from "../reducers/materialReducer.ts";
import supplierReducer from "../reducers/supplierReducer.ts";
import materialReceivedDetailsReducer from "../reducers/materialReceivedDetailsReducer.ts";
import projectReducer from "../reducers/projectReducer.ts";
import employeeReducer from "../reducers/employeeReducer.ts";


export const store = configureStore({
    reducer :{
        user : userReducer,
        material: materialReducer,
        supplier: supplierReducer,
        materialReceived:materialReceivedDetailsReducer,
        project: projectReducer,
        employee: employeeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;