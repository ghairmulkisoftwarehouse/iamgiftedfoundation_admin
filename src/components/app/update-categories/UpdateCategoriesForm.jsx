

import { useEffect, useState } from 'react';
import InputName  from '../../global/form/InputName';
import CategoryType   from '../../global/form/CategoryType';
// import Editor   from '../../global/form/Editor';
// import ErrorBoundary  from '../../global/ErrorBoundary';
import {validateCategoriesForm} from '../../../validations/categoriesValidation';
import {update_Category} from '../../../redux/actions/categoryActions';
import { useDispatch,useSelector } from 'react-redux';
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';

import SubmitLoading   from '../../../components/global/SubmitLoading';
import { useParams } from 'react-router-dom';




const UpdateCategoriesForm = () => {
  const [errors, setErrors] = useState({});
   const dispatch=useDispatch();
   const navigate=useNavigate();
  const queryClient = useQueryClient();
  const {id}=useParams();

     const { patchLoading,docDetails } = useSelector(state => state.category);



  const [formData, setFormData] = useState({
    title: "",
     type:"",
  });

   useEffect(() => {
    if (docDetails) {
      setFormData({
        title: docDetails.title || '',
        type: docDetails.type || '',
      });
    }
  }, [docDetails]);


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

const handleSelectChange = (field) => (value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
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
  setFormData({
    title: "",
       type:"",

   
  });

  setErrors({});       
};






const handleSubmit = async () => {
  const validationErrors = validateCategoriesForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  console.log("Form submitted:", formData);



  try {

    const payload = {
         ...( formData.title && {title: formData.title}),
        ...( formData.type && {type:formData.type}),


    };

    devLog('this is payload', payload);

    await dispatch(update_Category(id,payload, toast, navigate));
    queryClient.invalidateQueries('fetch-all-categories');
        queryClient.invalidateQueries('fetch-single-category');

   
    

    resetForm();
  
  } catch (error) {
    console.error(error);
    toast.error('Failed to add Event');
  }
};




  return (
    <div className=" bg-white   rounded-[15px]   pt-5  pb-11 flex flex-col gap-7  w-full ">
    {/* event basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Categorie Basics</h2>
     <p className=" text-xs sm:text-sm  text-black/50  leading-[21px]">Tell us about your cause and what you're raising funds for.</p> 
     </div>
     <div className=" w-full xl:w-[75%] grid md:grid-cols-4  gap-5 sm:gap-4 ">
        
      <div className='    md:col-span-3'>
        <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />

      </div>
       <div className='    md:col-span-3'>

     <CategoryType
  label=" Type"        
  selected={formData.type}     
  onSelect={handleSelectChange("type")}  
  error={errors.type}         
/>

     </div>

  
        



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
  className={`btn-primary w-[50%] sm:w-[210px] h-[50px] ${
    patchLoading ? "opacity-60 cursor-not-allowed" : ""
  }`}
  disabled={patchLoading} 
>
  {patchLoading ? <SubmitLoading size={12} /> : "Update Categories"}
</button>



      
      </div>
    
    </div>
  )
}

export default UpdateCategoriesForm