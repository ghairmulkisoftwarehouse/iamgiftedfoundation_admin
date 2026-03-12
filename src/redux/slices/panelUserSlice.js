import { createSlice } from "@reduxjs/toolkit";

const panelUserSlice = createSlice({
    name : 'panel user' ,
    initialState : {
        docs : [] ,
        docDetails : null ,
        loading : false , 
        page : 1 ,
        pages : 1 , 
        docsCount : 0 , 
       error: null, 
    createLoading:false,
   deleteLoading:false,
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
        setDocDetails (state , action) {
            state.docDetails = action.payload
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
          
           setCreateLoading (state , action) {
            state.createLoading = action.payload;
        } ,
          setDeleteLoading:(state, action) => {
      state.deleteLoading = action.payload;
    },
          setError: (state, action) => {
      state.error = action.payload;
    },
     
      setPatchLoading:(state, action) => {
      state.patchLoading = action.payload;
    },
    }
});

export const { 
    setStats ,setDocDetails,setLoading,setError,setCreateLoading,setDeleteLoading,setPatchLoading
} = panelUserSlice.actions;

export default panelUserSlice.reducer;