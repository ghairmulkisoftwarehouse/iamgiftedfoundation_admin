import Axios from "../../config/api";
import { setDeleteLoading,setError,setCreateLoading,setPatchLoading } from "../slices/postSlice";
import { getUser } from '../../utils/authLocalStorage';



export const Add_Post = (data, toast,navigate) => async (dispatch,) => {
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
    } = await Axios.post(`/post`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(message);
        navigate(`/app/post`);

  } catch (err) {
    const errorMsg = err?.response?.data?.data?.message || err?.message || "Something went wrong.";
    dispatch(setError(errorMsg));
    toast.error(errorMsg);
  } finally {
    dispatch(setCreateLoading(false));
  }
};


export const delete_Post = (id , toast) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
         const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/post/${id}`,  {
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


export const  update_Post = (id,data, toast,navigate) => async (dispatch) => {
  try {
    dispatch(setPatchLoading(true));

    const user = getUser();
    const token = user?.token;
    if (!token) throw new Error("User token not found.");
    const {
      data: {
        data: {  message },
      },
    } = await Axios.patch(`/post/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPatchLoading(false));
    toast.success(message);
    navigate(`/app/post`);

  } catch (err) {
    dispatch(setPatchLoading(false));
    dispatch(setError(err?.response?.data?.message || err.message));
    toast.error(err?.response?.data?.data?.message || err.message || "Something went wrong.");

  }
};



export const    delete_PostImages = (id , toast) => async ( dispatch ,) => {
    try {
        dispatch(setDeleteLoading(true));
         const user = getUser();
    const token = user?.token; 
    if (!token) throw new Error("User token not found.");
        const {
      data: {
        data: {  message },
      },
    } = await Axios.delete(`/post/delete-attachment/${id}`,  {
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


