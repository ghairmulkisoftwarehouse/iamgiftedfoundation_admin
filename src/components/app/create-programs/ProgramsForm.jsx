

import { useState } from 'react';
import ImageUpload   from '../../global/form/ImageUpload';
import InputName  from '../../global/form/InputName';
import InputEmail   from '../../global/form/InputEmail';
import InputPhoneNumber   from '../../global/form/InputPhoneNumber';
import InputTags   from '../../global/form/InputTags';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from '../../global/form/MultipleImage';
import {validateProgramForm} from '../../../validations/programValidation'


const ProgramsForm = () => {
   const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    description: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
    gallery:[],
    website: "",
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
    category: "",
    tags: [],
    description: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
    gallery: [],
    website: "",
    coverImage: null,
  });

  setImagePreview(""); 
  setErrors({});      
};

const handleSubmit = () => {
  const validationErrors = validateProgramForm(formData);
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
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Programs Basics</h2>
     <p className=" text-xs sm:text-sm  text-black/50  leading-[21px]">Tell us about your cause and what you're raising funds for.</p> 
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 ">
     <div className=' sm:col-span-2'>
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

          <InputName
            label="Category"
            value={formData.category}
            onChange={handleChange("category")}
            error={errors.category}
          />

            <div className="sm:col-span-2">
           <InputTags
  label="Tags"
  value={formData.tags}
  onChange={(tags) => {
    setFormData((prev) => ({ ...prev, tags }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.tags;
      return updated;
    });
  }}
  error={errors.tags}
/>

          </div>
     </div>

    </div>



     {/* Story basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5  w-full pb-6 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Story</h2>
     <p className="  text-xs sm:text-sm  text-black/50 leading-[21px]">Tell your story. Inspire people to care and contribute.</p>
        
     </div>
     <div className=" w-full xl:w-[75%] grid  grid-cols-1 gap-5 sm:gap-4 ">
       <ErrorBoundary>
            <Editor
              content={formData.description}
              setContent={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
                
              }
            error={errors.description}
            />
          </ErrorBoundary>
            <MultipleImage
            value={formData.gallery}
            onChange={(images) =>
              setFormData((prev) => ({ ...prev, gallery: images }))
            }
            error={errors.gallery}
          />
    
     </div>

    </div>


 {/* Organizer  basic  */}
        <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5  w-full pb-12 border-b px-5 border-black/40">
     <div className="  w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Organizer Details</h2>
     <p className=" text-xs sm:text-sm  text-black/50 leading-[21px]">Build trust by showing who's behind this campaign</p>
        
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 ">
  <InputName
            label="Organization Name"
            value={formData.organizationName}
            onChange={handleChange("organizationName")}
            error={errors.organizationName}
          />

          <InputPhoneNumber
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={errors.phoneNumber}
          />

          <InputEmail
            label="Email Address"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
          />

          <InputName
            label="Website"
            value={formData.website}
            onChange={handleChange("website")}
            error={errors.website}
          />
     
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
Create Program
        </button>


      
      </div>
    
    </div>
  )
}

export default ProgramsForm