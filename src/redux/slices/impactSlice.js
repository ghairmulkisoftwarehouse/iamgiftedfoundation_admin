import { createSlice } from "@reduxjs/toolkit";

const impactSlice = createSlice({
    name : 'impact' ,
    initialState : {
        impacts : [] ,
        loading : false ,  
       error: null, 
       deleteLoading:false,
       createLoading:false,
       patchLoading:false,

    } , 
    reducers : {
        setImpacts (state , action) {
   state.impacts = action.payload;
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
    setImpacts ,setLoading,setError,setDeleteLoading,
    setPatchLoading,
    setCreateLoading
} = impactSlice.actions;

export default impactSlice.reducer;