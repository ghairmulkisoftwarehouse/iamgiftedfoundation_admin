import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import appUserSlice   from './slices/appUserSlice';
import profileSlice   from './slices/profileSlice';
import eventSlice   from './slices/eventSlice'
import campaignSlice  from './slices/campaignSlice';
import programSlice   from './slices/programSlice';
import categorySlice   from './slices/categorySlice';
import postSlice  from './slices/postSlice';

const store = configureStore({
    reducer: {
           auth : authSlice ,
           appUser:appUserSlice,
          profile : profileSlice ,
          post:postSlice,
          event:eventSlice,
          campaign:campaignSlice,
          program:programSlice,
          category:categorySlice,
          
    }
});

export default store;