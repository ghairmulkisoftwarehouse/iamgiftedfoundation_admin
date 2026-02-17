

import { useState,useEffect } from 'react';
import ImageUpload   from '../../global/form/ImageUpload';
import InputName  from '../../global/form/InputName';
import InputNumber from '../../global/form/InputNumber';
// import InputEmail   from '../../global/form/InputEmail';
// import InputPhoneNumber   from '../../global/form/InputPhoneNumber';
// import InputTags   from '../../global/form/InputTags';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from '../../global/form/MultipleImage';
import {validateEventForm} from '../../../validations/eventValidation'
import  {update_Events} from '../../../redux/actions/eventActions';
import { useDispatch,useSelector } from 'react-redux';
import SubmitLoading   from '../../global/SubmitLoading';
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';
import DateInput  from '../../global/form/DateInput';
import moment from 'moment';
import { combineDateTime } from '../../../utils/combineDateTime';
import ProgramSelectInput   from './eventFrom/ProgramSelectInput';
import PillerSelectInput    from '../../global/form/PillerSelectInput';
import PillerSelectedInput   from './eventFrom/PillerSelectedInput';
import OrganizationInput   from './eventFrom/OrganizationInput';
import CompanyCard   from './eventFrom/CompanyCard'
import { setStats,setCompanyInfo,resetMultipleCompanyDetails } from '../../../redux/slices/companySlice';
import { useLocation } from "react-router-dom";
import InputTags   from './eventFrom/InputTags';
import { useParams } from 'react-router-dom';


const UpdateEventsForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const  navigate =useNavigate();
    const location = useLocation();
 const {id}=useParams();
   const { docDetails } = useSelector(state => state.event);
        
    
      // devLog(' this is a  docDetails',docDetails?.doc)
    
 
  const { patchLoading } = useSelector((state) => state.event);
   const { companyInfo ,multipleCompanyDetails} = useSelector((state) => state.company);




  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  

     const eventdoc=docDetails?.doc

 



    const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState('');

  
    const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('');



 




 

  const [formData, setFormData] = useState({
    title: '',
    piller:"",
    category:'',
    program:'',
        address:"",
    city:"",
    state:"", 
    coverImage: null,  
    description: '',
      gallery: [],
          sponsoredBy: [],
capacity:'',
hostedBy:'',
   waitlistEnabled: false 

  });

      useEffect(() => {
    if (eventdoc) {
      setFormData({
        title: eventdoc?.title || '',
          description: eventdoc.body || '',
         address: eventdoc.address || '',
         city: eventdoc.city || '',
         state: eventdoc.state || '',
         waitlistEnabled: eventdoc.waitlistEnabled || '' ,
          sponsoredBy: eventdoc.sponsoredBy || [], 
         
     
      
      });
    }
  }, [eventdoc]);

const isPillerEditable = formData.category?.title === "Program";
  // console.log('piller',formData?.piller)


  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      const updated = { ...errors };
      delete updated[field];
      setErrors(updated);
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
    title: '',
    piller: '',
    category: '',
    program: '',
    address: '',
    city: '',
    state: '',
    coverImage: null,
    description: '',
    gallery: [],
    sponsoredBy: [],    
    capacity: '',
    hostedBy: '',
    waitlistEnabled: false, 
  });
     dispatch(setCompanyInfo(null)); 
    dispatch(resetMultipleCompanyDetails());
  setEventDate(null);
  setEventTime('');
  setStartDate(null);
  setStartTime('');
  setEndDate(null);
  setEndTime('');
  setImagePreview('');
  setErrors({});
};



    // console.log('sponsoredBy',formData?.sponsoredBy)

const handleSubmit = async () => {
  const validationErrors = validateEventForm(formData,eventDate, eventTime,startDate, startTime, endDate, endTime);
  setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
    toast.error("Please fix the highlighted errors");
    return;
  }


    const eventDateTime = combineDateTime(eventDate, eventTime);
    
  const startDateTime = combineDateTime(startDate, startTime);
  const endDateTime = combineDateTime(endDate, endTime);

  try {
      const galleryUrls = formData.gallery?.length
      ? formData.gallery.map(item => item.url)
      : [];
       const sponsored = formData.sponsoredBy?.length
      ? formData.sponsoredBy.map(item => item?._id)
      : [];
    const payload = {
      title: formData.title,
      category:formData.category?._id,
       eventDate: eventDateTime,
       registrationStartDate: startDateTime,
      registrationEndDate: endDateTime,

  waitlistEnabled: formData.waitlistEnabled, 

        ...(formData.hostedBy && {
        hostedBy: formData.hostedBy?._id,
      }),
      ...(formData.program && {
        program: formData.program,
      }),
       ...(formData.piller && {
        piller: formData.piller?._id,
      }),
          ...(imagePreview && {
        featuredImageDataURI: imagePreview,
      }),
      ...(formData.capacity !== null && formData.capacity !== "" && {
  capacity: Number(formData.capacity),
}),
        ...(formData.description && {
        body: formData.description,
      }),
       ...(formData.address && {
        address: formData.address,
      }),
        ...(formData.city && {
        city: formData.city,
      }),
        ...(formData.state && {
        state: formData.state,
      }),

        ...(galleryUrls.length > 0 && {
        imagesDataURIs: galleryUrls,
      }),
      
        ...(sponsored.length > 0 && {
        sponsoredBy: sponsored,
      }),
      
    };

    // devLog('this is payload', payload);

       await dispatch(update_Events(id,payload, toast, navigate));
    queryClient.invalidateQueries('fetch-all-event');
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

          <ProgramSelectInput
             label="Category"
            selected={formData.category}
            onSelect={handleSelectChange("category")}
            error={errors.category}
          />

       <PillerSelectInput
        label="Piller"
            selected={formData.piller}
            onSelect={handleSelectChange("piller")}
            error={errors.piller}
              readOnly={!isPillerEditable}
  />

     <PillerSelectedInput
  readOnly={!formData.piller} 
    selected={formData.piller} 
  label="Program"
  value={formData.program}
  onSelect={handleSelectChange("program")}
  error={errors.program}
/>

   <DateInput
  label="Event Date"
  value={{ date: eventDate, time: eventTime }}
  onDateChange={handleDateChange('eventDate', setEventDate)}
  onTimeChange={handleDateChange('eventTime', setEventTime)}
  error={errors.eventDate  ||errors.eventTime}
/>  



       <InputNumber
            label="Capcity"
            value={formData.capacity}
            onChange={handleChange("capacity")}
            error={errors.capacity}
          />




          
   <DateInput
  label="Registration Start Date"
  value={{ date: startDate, time: startTime }}
  onDateChange={handleDateChange('startDate', setStartDate)}
  onTimeChange={handleDateChange('startTime', setStartTime)}
  error={errors.startDate  ||errors.startTime}
/>  


   <DateInput
  label="Registration End Date"
  value={{ date: endDate, time: endTime }}
  onDateChange={handleDateChange('endDate', setEndDate)}
  onTimeChange={handleDateChange('endTime', setEndTime)}
  error={errors.endDate  ||errors.endTime}
/>  


        
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



     <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5  w-full pb-6 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
    <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">Event Address</h2>
<p className="text-xs sm:text-sm text-black/50 leading-[21px]">
  Enter the full address of your event here so attendees know where to come.
</p>
        
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 ">
         <InputName
      label="Address"
      value={formData.address}
      onChange={handleChange("address")}
      error={errors.address}
    />
    <InputName
      label="City"
      value={formData.city}
      onChange={handleChange("city")}
      error={errors.city}
    />
    <InputName
      label="State"
      value={formData.state}
      onChange={handleChange("state")}
      error={errors.state}
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
     
<div className='sm:col-span-2'>
             <OrganizationInput
                label="Company"
            selected={formData.hostedBy}
            onSelect={handleSelectChange("hostedBy")}
            error={errors.hostedBy}
                />
</div>
      {
        companyInfo &&
        (

<div className='sm:col-span-2'>
<CompanyCard  doc={companyInfo}/>

</div>
        )
      }

<div className='sm:col-span-2'>
<InputTags

    label="Sponsored By"
  value={formData.sponsoredBy}
  onChange={(sponsoredBy) => {
    setFormData((prev) => ({ ...prev, sponsoredBy }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.sponsoredBy;
      return updated;
    });
  }}
  error={errors.sponsoredBy}
/>

      </div>  


       {multipleCompanyDetails && multipleCompanyDetails.length > 0 && (
      <>

  {multipleCompanyDetails.map((item, index) => (
      <CompanyCard key={index} doc={item}  width={'w-full'} />
    ))}
      </>
  
  
)}
     
      <div className='sm:col-span-2'>
      <div className="flex items-center gap-3">
    <input
  type="checkbox"
  id="waitlistEnabled"
  checked={formData.waitlistEnabled}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      waitlistEnabled: e.target.checked,
    }))
  }
  className="w-4 h-4 accent-black cursor-pointer"
/>
    <label htmlFor="waitlistEnabled" className="font-medium  text-xs sm:text-sm text-black/80">
      Enable Waitlist
    </label>
  </div>
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
          className={`btn-primary w-[50%] sm:w-[210px] h-[50px]
                ${patchLoading ? 'opacity-60 cursor-not-allowed' : ''}`}

          
        >
          {patchLoading ? <SubmitLoading size={12} /> : 'Update Event'}

        </button>


      
      </div>
    
    </div>
  )
}

export default UpdateEventsForm