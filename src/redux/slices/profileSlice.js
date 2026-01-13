// redux/slices/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doc: null,      
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.doc = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
