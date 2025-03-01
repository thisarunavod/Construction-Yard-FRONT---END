import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.ts";
import materialReducer from "../reducers/materialReducer.ts";
import supplierReducer from "../reducers/supplierReducer.ts";
import materialReceivedDetailsReducer from "../reducers/materialReceivedDetailsReducer.ts";
import projectReducer from "../reducers/projectReducer.ts";
import employeeReducer from "../reducers/employeeReducer.ts";
import vehicleReducer from "../reducers/vehicleReducer.ts";
import materialSendDetailsReducer from "../reducers/materialSendDetailsReducer.ts";


export const store = configureStore({
    reducer :{
        user : userReducer,
        material: materialReducer,
        supplier: supplierReducer,
        materialReceived:materialReceivedDetailsReducer,
        materialSend:materialSendDetailsReducer,
        project: projectReducer,
        employee: employeeReducer,
        vehicle:vehicleReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;