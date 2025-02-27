import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.ts";
import materialReducer from "../reducers/materialReducer.ts";
import supplierReducer from "../reducers/supplierReducer.ts";


export const store = configureStore({
    reducer :{
        user : userReducer,
        material: materialReducer,
        supplier: supplierReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;