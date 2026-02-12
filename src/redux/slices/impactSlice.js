import { createSlice } from "@reduxjs/toolkit";

const impactSlice = createSlice({
    name : 'impact' ,
    initialState : {
        // impacts : [] ,
        docs : [] ,
           page : 1 ,
        pages : 1 , 
        docsCount : 0 , 
        loading : false ,  
       error: null, 
       deleteLoading:false,
       createLoading:false,
       patchLoading:false,

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

     setCreateLoading:(state, action) => {
      state.createLoading = action.payload;
    },

      setPatchLoading:(state, action) => {
      state.patchLoading = action.payload;
    },
        setDeleteLoading:(state, action) => {
      state.deleteLoading = action.payload;
    },
     
    }
});

export const { 
    setStats ,setLoading,setError,setDeleteLoading,
    setPatchLoading,
    setCreateLoading
} = impactSlice.actions;

export default impactSlice.reducer;