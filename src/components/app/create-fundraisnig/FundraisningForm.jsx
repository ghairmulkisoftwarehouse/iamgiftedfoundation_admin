import { useState,useEffect } from 'react';
import ImageUpload   from '../../../components/global/form/ImageUpload';
import InputName  from '../../../components/global/form/InputName';
import InputEmail   from '../../../components/global/form/InputEmail';
import InputPhoneNumber   from '../../../components/global/form/InputPhoneNumber';
import InputTags   from '../../../components/global/form/InputTags';
import Editor   from '../../../components/global/form/Editor';
import ErrorBoundary  from '../../../components/global/ErrorBoundary';
import MultipleImage   from '../../../components/global/form/MultipleImage';
import {validateFundraisingForm} from '../../../validations/fundraisingValidation'
import { useDispatch,useSelector } from 'react-redux';
import SubmitLoading   from '../../../components/global/SubmitLoading';
import {Add_Campaign} from '../../../redux/actions/compaignActions'
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';
import { combineDateTime } from '../../../utils/combineDateTime';
import DateInput  from '../../../components/global/form/DateInput';
import moment from 'moment';


const FundraisningForm = () => {

  const dispatch=useDispatch();
    const navigate=useNavigate(); 
      const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState(null); 
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('');
  
     const {createLoading} = useSelector(state => state.campaign);
   const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});


useEffect(() => {
  if (startDate) {
    setStartTime(moment.utc().startOf("day").format("HH:mm"));
  }

  if (endDate) {
    setEndTime(moment.utc().startOf("day").format("HH:mm"));
  }
}, [startDate, endDate]);

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

   const handleDateChange = (field, setValue) => (value) => {
    setValue(value);
    if (errors[field]) {
      const updated = { ...errors };
      delete updated[field];
      setErrors(updated);
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
    setStartDate(null);
            setStartTime('');
            setEndDate(null);
            setEndTime('');

  setImagePreview("");
  setErrors({});       
};

const handleSubmit = async () => {
  const validationErrors = validateFundraisingForm(formData,startDate, startTime, endDate, endTime);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;
    const startDateTime = combineDateTime(startDate, startTime);
    const endDateTime = combineDateTime(endDate, endTime);

  try {
    const galleryUrls = Array.isArray(formData.gallery)
      ? formData.gallery.map(item => item.url)
      : [];

    const payload = {
      title: formData.title,
         startDate: startDateTime,

      endDate: endDateTime,

      ...(imagePreview && {
        featuredImageDataURI: imagePreview,
      }),

      ...(formData.description && {
        body: formData.description,
      }),

      ...(galleryUrls.length > 0 && {
        attachmentsDataURIs: galleryUrls,
      }),
    };

    devLog('this is payload', payload);

    await dispatch(Add_Campaign(payload, toast, navigate));

    queryClient.invalidateQueries(['fetch-all-campaign']);

    resetForm();
  } catch (error) {
    console.error(error);
    toast.error('Failed to add campaign');
  }
};



  return (
    <div className=" bg-white   rounded-[15px]   pt-5  pb-11 flex flex-col gap-7  w-full ">
    {/* event basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Event Basics</h2>
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


             <DateInput
  label="Start Date"
  value={{ date: startDate, time: startTime }}
  onDateChange={handleDateChange('startDate', setStartDate)}
  onTimeChange={handleDateChange('startDate', setStartTime)}
  error={errors.startDate}
/>

<DateInput
  label="End Date"
  value={{ date: endDate, time: endTime }}
  onDateChange={handleDateChange('endDate', setEndDate)}
  onTimeChange={handleDateChange('endDate', setEndTime)}
  error={errors.endDate}
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

       <div className="flex flex-row gap-2 items-center justify-end w-full px-3.5">
  <button
    type="button"
    onClick={resetForm}
    className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
    disabled={createLoading}
  >
    Cancel
  </button>

  <button
    type="button"
    onClick={handleSubmit}
    disabled={createLoading}
    className={`btn-primary w-[50%] sm:w-[210px] h-[50px] 
      ${createLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
  >
    {createLoading ? <SubmitLoading size={12} /> : 'Create Fundraisning'}
  </button>
</div>

    
    </div>
  )
}

export default FundraisningForm