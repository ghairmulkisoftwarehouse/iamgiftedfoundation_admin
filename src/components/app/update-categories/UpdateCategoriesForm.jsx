

import { useState } from 'react';
import InputName  from '../../global/form/InputName';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import {validateCategoriesForm} from '../../../validations/categoriesValidation';
import ImageUpload   from '../../global/form/ImageUpload';



const UpdateCategoriesForm = () => {
  const [errors, setErrors] = useState({});

  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,

 

  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const resetForm = () => {
  setFormData({
    title: "",
    description: "",
      coverImage: null,
   
  });

  setErrors({});       
};

const handleSubmit = () => {
  const validationErrors = validateCategoriesForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  console.log("Form submitted:", formData);

  resetForm();
};


  return (
    <div className=" bg-white   rounded-[15px]   pt-5  pb-11 flex flex-col gap-7  w-full ">
    {/* event basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Categorie Basics</h2>
     <p className=" text-xs sm:text-sm  text-black/50  leading-[21px]">Tell us about your cause and what you're raising funds for.</p> 
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1  gap-5 sm:gap-4 ">
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
      
       <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />

  
           <ErrorBoundary>
            <Editor
              content={formData.description}
              setContent={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
                
              }
            error={errors.description}
            />
          </ErrorBoundary>



     </div>

    </div>



  

          <div className="flex flex-row gap-2 items-center justify-end w-full  px-3.5 ">
     <button
    type="button"
    onClick={resetForm}  
    className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
  >
    Cancel
  </button>
        <button
          onClick={handleSubmit}
          className="btn-primary w-[50%] sm:w-[210px] h-[50px]"
        >
         Update Categories
        </button>


      
      </div>
    
    </div>
  )
}

export default UpdateCategoriesForm