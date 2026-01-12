// redux/actions/authActions.js
import Axios from '../../config/api';
import { toast } from 'react-toastify';
import { clearErrors, setError, setLoading, setUser, logoutUser } from '../slices/authSlice';
import { getToken } from '../../utils/cookies';
import returnErrorMsg from '../../utils/returnErrorMsg';

export const login = (data, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // IMPORTANT: withCredentials: true is already set in Axios config
    const response = await Axios.post('/admin/login', data);
    const { data: responseData } = response;
    
    const token = getToken();
    
    if (token) {
      const userData = {
        token,
      
        ...(responseData.data?.user || {}),
        email: data.identifier, 
      };

      dispatch(setUser(userData));
    }
    
    toast.success(responseData.message || 'Login successful');
    navigate('/app/dashboard');
       dispatch(setLoading(false));
    dispatch(clearErrors());
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError({ login: returnErrorMsg(err) }));
    toast.error(returnErrorMsg(err));
  }
};


export const logout = (navigate, showToast = true) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await Axios.post('/user/logout'); 
    dispatch(logoutUser());      
    navigate('/auth/login');   
    dispatch(setLoading(false));
    if (showToast) {
      toast.success('Logged out successfully.');
    }
  } catch (err) {
    dispatch(setLoading(false));
    toast.error(returnErrorMsg(err));
  }
};
