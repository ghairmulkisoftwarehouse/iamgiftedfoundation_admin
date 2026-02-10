import { useState } from 'react';
import InputName from '../../global/form/InputName';
import Editor from '../../global/form/Editor';
import ErrorBoundary from '../../global/ErrorBoundary';
import ProgramInput   from '../../../components/global/form/ProgramInput';
import PillerSelectInput  from '../../../components/global/form/PillerSelectInput';
import { validateUpadateImpactForm } from '../../../validations/updateImpactValidation';
import ImpactCategoryInput  from '../../global/form/ImpactCategoryInput';
import PillerSelectedInput   from './fromImpact/PillerSelectedInput';
import {update_Impact} from '../../../redux/actions/impactActions';
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SubmitLoading   from '../../../components/global/SubmitLoading';
import { useParams } from 'react-router-dom';

// import MultipleImage from '../../global/form/MultipleImage';
// import InputOption from '../../global/form/InputOption';

const ImpactForm = () => {
  const [errors, setErrors] = useState({});

  const {id}=useParams();


  console.log('  this is a  id',id)

    const dispatch = useDispatch();
  const queryClient = useQueryClient();  
   const     navigate=useNavigate();                           
  const { patchLoading, } = useSelector((state) => state.impact);


 const [formData, setFormData] = useState({
  title: "",
  description: "",
  piller: "",
  program: "",
  supportCount: "",
  amount: "",
  category: "",
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



const handleSelectChange = (field) => (value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
    ...(field === "piller" && { program: "" })
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
    description: "",
    piller: "",
    program: "",
    supportCount: "",
    amount: "",
    category: "",
  });
  setErrors({});
};


const handleSubmit = async () => {
  // Validate form
  const validationErrors = validateUpadateImpactForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  // Prepare payload
  const payload = {
    ...(formData.title && { title: formData.title }),
   ...( formData.description && {description: formData.description}),
     ...(formData.piller && { piller: formData.piller }),

    ...( formData.program && {program: formData.program}),
   ...( formData.supportCount && {supportCount: formData.supportCount}),
      ...( formData.amount && {amount: formData.amount}),
     ...( formData.category && { category: formData.category}),


  };

  console.log("Form submitted payload:", payload);

  try {
 await dispatch(update_Impact(id, payload, toast, navigate));

    queryClient.invalidateQueries(["fetch-all-impact"]);
    resetForm();   
  } catch (error) {
    console.error("Error submitting impact:", error);
  }
};

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">
      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">Impact Basics</h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Tell us about your cause and what you're raising funds for.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
   

          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />


        <PillerSelectInput 
          
          label="Piller"
              value={formData.piller}
            onSelect={handleSelectChange("piller")}
            error={errors.piller}
        />
        

       <PillerSelectedInput
  readOnly={!formData.piller} 
    selected={formData.piller} 
  label="Program"
  value={formData.program}
  onSelect={handleSelectChange("program")}
  error={errors.program}
/>

          <InputName
            label="Support Count"
            value={formData.supportCount}
            onChange={handleChange("supportCount")}
            error={errors.supportCount}
          />

            <InputName
            label="Amount"
            value={formData.amount}
            onChange={handleChange("amount")}
            error={errors.amount}
          />
          <ImpactCategoryInput
                label="Category"
            value={formData.category}
            onChange={handleChange("category")}
            error={errors.category}

          />
          <div className="xl:col-span-2">
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
  onClick={handleSubmit}
  disabled={patchLoading}
  className={`btn-primary w-[50%] sm:w-[210px] h-[50px] ${
    patchLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {patchLoading ? <SubmitLoading size={12} /> : 'Update Impact'}
</button>

      
      </div>
    </div>
  );
};

export default ImpactForm;
