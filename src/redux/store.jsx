import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import appUserSlice   from './slices/appUserSlice';
import profileSlice   from './slices/profileSlice';
import eventSlice   from './slices/eventSlice'
import campaignSlice  from './slices/campaignSlice';
import companySlice  from './slices/companySlice';
import programSlice   from './slices/programSlice';
import programPillarSlice   from './slices/programPillarSlice';
import categorySlice   from './slices/categorySlice';
import postSlice  from './slices/postSlice';
import impactSlice  from './slices/impactSlice';
import pillarSlice   from './slices/pillarSlice';
import  donationSlice    from './slices/donationSlice';
const store = configureStore({
    reducer: {
           auth : authSlice ,
           appUser:appUserSlice,
          profile : profileSlice ,
          post:postSlice,
          event:eventSlice,
          campaign:campaignSlice,
          program:programSlice,
          programPillar:programPillarSlice,
          category:categorySlice,
          impact:impactSlice,
          piller:pillarSlice,
          company:companySlice,
          donation:donationSlice,
          
    }
});

export default store;