import { useState } from 'react';
import InputName from '../../global/form/InputName';
import InputEmail from '../../global/form/InputEmail';
import PasswordInput from '../../global/form/InputPassword';


import { update_PanelUser } from '../../../redux/actions/panelUserActions';
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SubmitLoading from '../../../components/global/SubmitLoading';
import { useParams } from 'react-router-dom';

const initialForm = {
  fullName: "",
  name: "",
  email: "",

};

const NewUserForm = () => {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialForm);
  const {id}=useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { patchLoading } = useSelector((state) => state.panelUser);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
  };

  const handleSubmit = async () => {

const payload = {
  ...(formData.fullName && { fullName: formData.fullName }),
  ...(formData.name && { username: formData.name }),
  ...(formData.email && { email: formData.email }),
};
  console.log("Payload:", payload);

  try {
    await dispatch(update_PanelUser(id,payload, toast, navigate));
    queryClient.invalidateQueries({ queryKey: ["fetch-all-Panel-user"] });
    resetForm();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">

      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">

        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
            User Basics
          </h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Create a new panel user account.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">

          <InputName
            label="User Name"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
          />

          <InputName
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            error={errors.fullName}
          />

          <InputEmail
            label="Email"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
          />


        </div>

      </div>

      <div className="flex flex-row gap-2 items-center justify-end w-full px-3.5">

        <button
          type="button"
          onClick={resetForm}
          className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={patchLoading}
          className={`btn-primary w-[50%] sm:w-[210px] h-[50px] ${
            patchLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {patchLoading ? <SubmitLoading size={12} /> : 'Update User'}
        </button>

      </div>

    </div>
  );
};

export default NewUserForm;