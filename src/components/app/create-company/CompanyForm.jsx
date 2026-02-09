import { useState } from 'react';
import ImageUpload from '../../global/form/ImageUpload';
import InputName from '../../global/form/InputName';
import { validateCompanyForm } from '../../../validations/companyValidation';
import { useDispatch, useSelector } from 'react-redux';
import SubmitLoading from '../../global/SubmitLoading';
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';
import { Add_Company } from '../../../redux/actions/companyActions';

const CompanyForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createLoading } = useSelector((state) => state.company);

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      const updated = { ...errors };
      delete updated[field];
      setErrors(updated);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      coverImage: '',
    });
    setImagePreview('');
    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = validateCompanyForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const payload = {
        title: formData.title,
        ...(formData.coverImage && { logoDataURI: formData.coverImage }),
      };

      devLog('this is payload', payload);

      await dispatch(Add_Company(payload, toast, navigate));
      queryClient.invalidateQueries('fetch-all-company');

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add company');
    }
  };

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">
      {/* Company basic */}
      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
            Company Basics
          </h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Tell us about your company.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
          <div className="sm:col-span-2">
            <ImageUpload
              label="Cover Image"
              imagePreview={imagePreview}
              setImagePreview={(img) => {
                setImagePreview(img);
                setFormData((prev) => ({ ...prev, coverImage: img }));

                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.coverImage;
                  return updated;
                });
              }}
              error={errors.coverImage}
            />
          </div>

          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
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
          disabled={createLoading}
          className="btn-primary w-[50%] sm:w-[210px] h-[50px]"
        >
          {createLoading ? <SubmitLoading /> : 'Create Company'}
        </button>
      </div>
    </div>
  );
};

export default CompanyForm;
