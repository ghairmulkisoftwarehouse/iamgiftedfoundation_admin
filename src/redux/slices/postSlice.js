import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : 'post' ,
    initialState : {
        docs : [] ,
            docDetails: null,

        loading : false , 
        page : 1 ,
        pages : 1 , 
        docsCount : 0 , 
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
         setDocDetails(state, action) {
      state.docDetails = action.payload;
    },
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
       
            setDeleteLoading:(state, action) => {
      state.deleteLoading = action.payload;
    },
       setCreateLoading:(state, action) => {
          state.createLoading = action.payload;
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
    setStats ,setLoading,setError,setDeleteLoading,setCreateLoading,setPatchLoading,setDocDetails
} = postSlice.actions;

export default postSlice.reducer;