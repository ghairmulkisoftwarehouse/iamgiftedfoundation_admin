import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : 'post' ,
    initialState : {
        docs : [] ,
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
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
       
          setError: (state, action) => {
      state.error = action.payload;
    },
     
    }
});

export const { 
    setStats ,setLoading,setError
} = postSlice.actions;

export default postSlice.reducer;