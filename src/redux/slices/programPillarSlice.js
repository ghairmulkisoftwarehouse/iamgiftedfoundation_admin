import { createSlice } from '@reduxjs/toolkit';

const programPillarSlice = createSlice({
  name: 'program pillar',

  initialState: {
    docs: [],
    page: 1,
    pages: 1,
    docsCount: 0,
    pageSize: 10,
  },

  reducers: {
    // /pillar
    setStats(state, action) {
      const { docs, docsCount, page, pages } = action.payload;
      state.docs = docs;
      state.docsCount = docsCount;
      state.page = page;
      state.pages = pages;
    },
  },
});

export const { setStats } = programPillarSlice.actions;

export default programPillarSlice.reducer;
