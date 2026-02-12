import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    docs: [],
    docDetails: null,
    companyInfo: null,
    multipleCompanyDetails: [], 

    loading: false,
    page: 1,
    pages: 1,
    docsCount: 0,

    createLoading: false,
    deleteLoading: false,
    patchLoading: false,

    error: null,
  },

  reducers: {
    setStats(state, action) {
      const { docs, docsCount, page, pages } = action.payload;
      state.docs = docs;
      state.docsCount = docsCount;
      state.page = page;
      state.pages = pages;
    },

    setDocDetails(state, action) {
      state.docDetails = action.payload;
    },

    setCompanyInfo(state, action) {
      state.companyInfo = action.payload;
    },

    setMultipleCompanyDetails(state, action) {
      state.multipleCompanyDetails = action.payload;
    },
resetMultipleCompanyDetails(state) {
      state.multipleCompanyDetails = [];
    },


    removeCompanyDetail(state, action) {
      state.multipleCompanyDetails = state.multipleCompanyDetails.filter(
        (item) => item._id !== action.payload
      );
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setCreateLoading(state, action) {
      state.createLoading = action.payload;
    },

    setPatchLoading(state, action) {
      state.patchLoading = action.payload;
    },

    setDeleteLoading(state, action) {
      state.deleteLoading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setStats,
  setDocDetails,
  setCompanyInfo,
  setMultipleCompanyDetails,
    resetMultipleCompanyDetails,
  removeCompanyDetail,
  setLoading,
  setCreateLoading,
  setPatchLoading,
  setDeleteLoading,
  setError,
} = companySlice.actions;

export default companySlice.reducer;
