import Axios from "../../config/api";
import {  setDeleteLoading,setCreateLoading,setError,setPatchLoading } from "../slices/impactSlice";
import { getUser } from '../../utils/authLocalStorage';



export const Add_Impact = (data, toast,navigate) => async (dispatch,) => {
  try {
    dispatch(setCreateLoading(true));
    dispatch(setError(null));

    const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");

    const {
      data: {
        data: { message },
      },
    } = await Axios.post(`/impact`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(message);
     navigate(`/app/impact`);


  } catch (err) {
    const errorMsg = err?.response?.data?.data?.message || err?.message || "Something went wrong.";
    dispatch(setError(errorMsg));
    toast.error(errorMsg);
  } finally {
    dispatch(setCreateLoading(false));
  }
};



export const update_Impact = (id,data, toast,navigate) => async (dispatch) => {
  try {
    dispatch(setPatchLoading(true));

    const user = getUser();
    const token = user?.token;
    if (!token) throw new Error("User token not found.");
    const {
      data: {
        data: {  message },
      },
    } = await Axios.patch(`/impact/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPatchLoading(false));
    toast.success(message);
         navigate(`/app/impact`);

  } catch (err) {
    dispatch(setPatchLoading(false));
    dispatch(setError(err?.response?.data?.message || err.message));
    toast.error(err?.response?.data?.data?.message || err.message || "Something went wrong.");

  }
};



export const deleteImpact = (id , toast) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
         const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/impact/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
        dispatch(setDeleteLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('Delete Category error' , err);
        toast.error(err?.response?.data?.message || err?.message || 'Something went wrong.');
    }
}