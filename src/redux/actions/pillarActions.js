import Axios from "../../config/api";
import {  setCreateLoading,setError ,setDeleteLoading,setPatchLoading} from "../slices/pillarSlice";
import { getUser } from '../../utils/authLocalStorage';

export const Add_Pillar = (data, toast,navigate) => async (dispatch,) => {
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
    } = await Axios.post(`/piller`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(message);
    navigate(`/app/piller`);

  } catch (err) {
    const errorMsg = err?.response?.data?.data?.message || err?.message || "Something went wrong.";
    dispatch(setError(errorMsg));
    toast.error(errorMsg);
  } finally {
    dispatch(setCreateLoading(false));
  }
};



export const Delete_Pillar = (id , toast) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
         const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/piller/${id}`,  {
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



export const Update_Piller = (id,data, toast,navigate) => async (dispatch) => {
  try {
    dispatch(setPatchLoading(true));

    const user = getUser();
    const token = user?.token;
    if (!token) throw new Error("User token not found.");
    const {
      data: {
        data: {  message },
      },
    } = await Axios.patch(`/piller/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPatchLoading(false));
    toast.success(message);
         navigate(`/app/piller`);

  } catch (err) {
    dispatch(setPatchLoading(false));
    dispatch(setError(err?.response?.data?.message || err.message));
    toast.error(err?.response?.data?.data?.message || err.message || "Something went wrong.");

  }
};

