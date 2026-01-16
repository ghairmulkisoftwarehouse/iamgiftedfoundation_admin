import { createSlice } from "@reduxjs/toolkit";

const appUserSlice = createSlice({
    name : 'app user' ,
    initialState : {
        docs : [] ,
        docDetails : null ,
        loading : false , 
        page : 1 ,
        pages : 1 , 
        docsCount : 0 , 
       error: null, 
    } , 
    reducers : {
        setStats (state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.page = page;
            state.pages = pages;
        } ,
        setDocDetails (state , action) {
            state.docDetails = action.payload
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
          
          setError: (state, action) => {
      state.error = action.payload;
    },
     
    }
});

export const { 
    setStats ,setDocDetails,setLoading,setError
} = appUserSlice.actions;

export default appUserSlice.reducer;