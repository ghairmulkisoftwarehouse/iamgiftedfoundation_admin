import Axios from "../../config/api";
import {  setCreateLoading,setError } from "../slices/eventSlice";
import { getUser } from '../../utils/authLocalStorage';

export const Add_Event = (data, toast,navigate) => async (dispatch,) => {
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
    } = await Axios.post(`/event/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(message);
        navigate(`/app/events`);

  } catch (err) {
    const errorMsg = err?.response?.data?.data?.message || err?.message || "Something went wrong.";
    dispatch(setError(errorMsg));
    toast.error(errorMsg);
  } finally {
    dispatch(setCreateLoading(false));
  }
};
