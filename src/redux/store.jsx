import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import profileSlice   from './slices/profileSlice';

const store = configureStore({
    reducer: {
           auth : authSlice ,
          profile : profileSlice ,
    }
});

export default store;