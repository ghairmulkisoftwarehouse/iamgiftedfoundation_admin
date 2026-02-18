// redux/actions/authActions.js
import Axios from '../../config/api';
import { toast } from 'react-toastify';
import {clearErrors, setLoading, setUser,setAuthErrors } from '../slices/authSlice';
import {getUser,removeUser, storeUser } from '../../utils/authLocalStorage';




export const login = (data , navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
          const {
      data: {
        data: { message, doc },
      },
    } = await Axios.post("/admin/login", data);
          const token = doc?.token;
            toast.success(message);
        dispatch(setUser({ ...doc, token }));
    storeUser({ ...doc, token });
        navigate(`/app/dashboard`);
        dispatch(clearErrors())
        dispatch(setLoading(false));
    } catch (err) {
     dispatch(setLoading(false));
    console.error("Login error:", err);

    const errorMessage = 
      err?.response?.data?.data?.message ||
      err?.response?.data?.message || 
      err?.message || 
      "Something went wrong.";
    dispatch(setAuthErrors(errorMessage)); 
    toast.error(errorMessage);
    }
}





export const logout = (navigate, toast) => async (dispatch) => {
    const user = getUser();
  const token = user?.token;
  if (!token) {
    toast.error("User token not found. Please login first.");
    return;
  }

  dispatch(setLoading(true));

  try {
    const {
      data: {
        data: { message },
      },
    } = await Axios.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    removeUser();
        dispatch(setUser(null));
    dispatch(setLoading(false));
    dispatch(clearErrors());
    navigate("/");
    toast.success(message);

  } catch (err) {
    dispatch(setLoading(false));
    console.error("logout error", err);
        const errorMessage = 
      err?.response?.data?.data?.message ||
      err?.response?.data?.message || 
      err?.message || 
      "Something went wrong.";

    toast.error(errorMessage);
  }
};
