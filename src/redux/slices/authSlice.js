import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../utils/authLocalStorage';

const errorsInitState = {
  login: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
   user : getUser() || null ,   
    loading: false,
    errors: errorsInitState,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
     setAuthErrors(state, action) {
      state.authErrors = action.payload;
    },

    clearErrors(state) {
      state.errors = errorsInitState;
    },
  },
});

export const {
  setUser,
  setLoading,
  setAuthErrors,
  clearErrors,
} = authSlice.actions;

export default authSlice.reducer;
