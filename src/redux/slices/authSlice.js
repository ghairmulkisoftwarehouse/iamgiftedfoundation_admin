// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getToken, removeToken } from '../../utils/cookies';

const getUserFromToken = () => {
  const token = getToken();
  return token ? { token } : null;
};

const errorsInitState = {
  login: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromToken() || null,
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
    setError(state, action) {
      state.errors = { ...action.payload };
    },
    clearErrors(state) {
      state.errors = errorsInitState;
    },
    logoutUser(state) {
      state.user = null;
      removeToken();
    },
  },
});

export const { setUser, setLoading, setError, clearErrors, logoutUser } = authSlice.actions;
export default authSlice.reducer;