import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer.ts";
import materialReducer from "../reducers/materialReducer.ts";


export const store = configureStore({
    reducer :{
        user : userReducer,
        material: materialReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;