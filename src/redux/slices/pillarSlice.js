import { createSlice } from '@reduxjs/toolkit';

const pillarSlice = createSlice({
  name: 'pillar',

  initialState: {
    docs: [],
    page: 1,
    pages: 1,
    docsCount: 0,
    pageSize: 10,
      createLoading:false,
        patchLoading:false,
        deleteLoading:false,
       error: null, 
               docDetails : null ,

  },

  reducers: {
    setStats(state, action) {
      const { docs, docsCount, page, pages } = action.payload;
      state.docs = docs;
      state.docsCount = docsCount;
      state.page = page;
      state.pages = pages;
    },
      setLoading (state , action) {
            state.loading = action.payload;
        } ,
           setCreateLoading (state , action) {
            state.createLoading = action.payload;
        } ,
           setPatchLoading (state , action) {
            state.patchLoading = action.payload;
        } ,

           setDeleteLoading (state , action) {
            state.deleteLoading = action.payload;
        } ,
        
          setError: (state, action) => {
      state.error = action.payload;
    },
      setDocDetails (state , action) {
            state.docDetails = action.payload
        } , 
  },
});

export const { setStats,setLoading,setCreateLoading,setPatchLoading,setDeleteLoading,setError,setDocDetails } = pillarSlice.actions;

export default pillarSlice.reducer;
