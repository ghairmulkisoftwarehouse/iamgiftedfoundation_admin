import Axios from "../../config/api";
import {  setCreateLoading,setError,setDeleteLoading ,setPatchLoading} from "../slices/companySlice";
import { getUser } from '../../utils/authLocalStorage';

export const Add_Company = (data, toast,navigate) => async (dispatch,) => {
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
    } = await Axios.post(`/company`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(message);
    navigate(`/app/company`);

  } catch (err) {
    const errorMsg = err?.response?.data?.data?.message || err?.message || "Something went wrong.";
    dispatch(setError(errorMsg));
    toast.error(errorMsg);
  } finally {
    dispatch(setCreateLoading(false));
  }
};



export const delete_Company = (id , toast) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
         const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/company/${id}`,  {
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


export const update_Company = (id,data, toast,navigate) => async (dispatch) => {
  try {
    dispatch(setPatchLoading(true));

    const user = getUser();
    const token = user?.token;
    if (!token) throw new Error("User token not found.");
    const {
      data: {
        data: {  message },
      },
    } = await Axios.patch(`/company/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setPatchLoading(false));
    toast.success(message);
         navigate(`/app/company`);

  } catch (err) {
    dispatch(setPatchLoading(false));
    dispatch(setError(err?.response?.data?.message || err.message));
    toast.error(err?.response?.data?.data?.message || err.message || "Something went wrong.");

  }
};