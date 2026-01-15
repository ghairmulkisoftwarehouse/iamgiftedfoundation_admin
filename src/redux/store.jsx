import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import profileSlice   from './slices/profileSlice';
import eventSlice   from './slices/eventSlice'
import campaignSlice  from './slices/campaignSlice';
import programSlice   from './slices/programSlice';
import categorySlice   from './slices/categorySlice';

const store = configureStore({
    reducer: {
           auth : authSlice ,
          profile : profileSlice ,
          event:eventSlice,
          campaign:campaignSlice,
          program:programSlice,
          category:categorySlice,
          
    }
});

export default store;