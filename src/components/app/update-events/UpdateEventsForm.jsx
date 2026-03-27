

import { useState,useEffect } from 'react';
import ImageUpload   from '../../global/form/ImageUpload';
import InputName  from '../../global/form/InputName';
import InputNumber from '../../global/form/InputNumber';
// import InputEmail   from '../../global/form/InputEmail';
// import InputPhoneNumber   from '../../global/form/InputPhoneNumber';
// import InputTags   from '../../global/form/InputTags';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from './eventFrom/MultipleImage';
import  InputOption  from './eventFrom/InputOption';
import {validateUpdateEventForm} from '../../../validations/updateEventValidation'
import  {update_Events,delete_EventImages} from '../../../redux/actions/eventActions';

import { useDispatch,useSelector } from 'react-redux';
import SubmitLoading   from '../../global/SubmitLoading';
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
// import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';
import DateInput  from '../../global/form/DateInput';
import moment from 'moment';
import { combineDateTime } from '../../../utils/combineDateTime';
import ProgramSelectInput   from './eventFrom/ProgramSelectInput';
import PillerSelectInput    from './eventFrom/PillerSelectInput';
import PillerSelectedInput   from './eventFrom/PillerSelectedInput';
import OrganizationInput   from './eventFrom/OrganizationInput';
import CompanyCard   from './eventFrom/CompanyCard'
import { setStats,setCompanyInfo,resetMultipleCompanyDetails } from '../../../redux/slices/companySlice';
import { useLocation } from "react-router-dom";
import InputTags   from './eventFrom/InputTags';
import { useParams } from 'react-router-dom';
import Axios from '../../../config/api';
import { useQuery } from "react-query";
import { convertImageUrlToBase64} from '../../../utils/convertImageUrlToBase64';
import { baseURL } from '../../../config/api';
import TeamsInput    from './eventFrom/TeamsInput';
import  TeamCard  from './eventFrom/TeamCard';




const UpdateEventsForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const  navigate =useNavigate();
    const location = useLocation();
 const {id}=useParams();
   const { docDetails,patchLoading } = useSelector(state => state.event);
      const { companyInfo ,multipleCompanyDetails} = useSelector((state) => state.company);
      const {  multipleTeamDetails} = useSelector((state) => state.team);
 



 

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

     const eventdoc=docDetails?.doc
   console.log(' this is a eventdoc',eventdoc);


   const { docs } = useSelector((state) => state.company);


  const { isLoading, isError } = useQuery(
    ["fetch-all-company",],
    async () => {
      let url = `/company?sortBy=createdAt_descending`;
      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );





const [eventDate, setEventDate] = useState(null);
const [eventTime, setEventTime] = useState('');
const [eventEndDate, setEventEndDate] = useState(null);
const [eventEndTime, setEventEndTime] = useState('');

  
    const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState('');
  const [formData, setFormData] = useState({
    title: '',
      slug:"",
    shortDescription:'',
      eventType:'',
    eventSubtype:'',
    piller:"",
    
    category:'',
    program:'',
     locationName:'',
        address:"",
    city:"",
    state:"", 
    coverImage: null,  
    description: '',
      gallery: [],
          sponsoredBy: [],
           team:[],
capacity:'',
hostedBy:'',
   waitlistEnabled: false ,
   isVirtual: false ,
autoArchive:false,
status:false,

  });



    useEffect(() => {
      const initializeForm = async () => {
        if (!eventdoc) return;

        // Companies
        const matchedCompanies = docs.filter(company =>
          eventdoc.sponsoredBy?.some(s => s._id === company._id)
        );



        // Cover image
        let coverBase64 = '';
        if (eventdoc.featuredImage?.relativeAddress) {
          const fullUrl = eventdoc.featuredImage.relativeAddress.startsWith("https")
            ? eventdoc.featuredImage.relativeAddress
            : `${baseURL}/${eventdoc.featuredImage.relativeAddress}`;
          coverBase64 = await convertImageUrlToBase64(fullUrl);
          setImagePreview(coverBase64);
        }

        // Gallery
        let galleryBase64 = [];
        if (eventdoc.images?.length) {
          galleryBase64 = await Promise.all(
            eventdoc.images.map(async (img) => {
              const fullUrl = img.relativeAddress.startsWith("https")
                ? img.relativeAddress
                : `${baseURL}/${img.relativeAddress}`;
              const base64 = await convertImageUrlToBase64(fullUrl);
              return base64 ? { url: base64, _id: img._id, isExisting: true } : null;
            })
          );
          galleryBase64 = galleryBase64.filter(Boolean);
        }

        setFormData((prev) => ({
          ...prev,
          title: eventdoc?.title || '',
          description: eventdoc?.body || '',
          address: eventdoc?.address || '',
           slug:eventdoc?.slug || '',
         eventType:eventdoc?.eventType || '',
    eventSubtype:eventdoc?.eventSubtype || '',
    shortDescription:eventdoc?.shortDescription || '',
       locationName: eventdoc?.locationName || '',
          city: eventdoc?.city || '',
          state: eventdoc?.state || '',
          waitlistEnabled: eventdoc?.waitlistEnabled || false,
                isVirtual:eventdoc?.isVirtual || false ,
autoArchive:eventdoc?.autoArchive || false ,
  status: eventdoc?.status === "published", 
    sponsoredBy: matchedCompanies,
          capacity:eventdoc?.capacity || '',
          piller:eventdoc?.piller || '',
          program:eventdoc?.program?._id || '',
          category:eventdoc?.category || '',
      
          coverImage: coverBase64 || prev.coverImage,
          gallery: galleryBase64.length ? galleryBase64 : prev.gallery,
        }));
      };


      
      if (eventdoc?.eventStartDate) {
        const mDate = moment(eventdoc?.eventStartDate);
        setEventDate(mDate.toDate());
        setEventTime(mDate.format('HH:mm'));
      }

         if (eventdoc?.eventEndDate) {
        const mDate = moment(eventdoc?.eventEndDate);
        setEventEndDate(mDate.toDate());
        setEventEndTime(mDate.format('HH:mm'));
      }

        if (eventdoc?.registrationStartDate) {
        const regDate = moment(eventdoc?.registrationStartDate);
        setStartDate(regDate.toDate());
        setStartTime(regDate.format('HH:mm'));
      }


      if (eventdoc?.registrationEndDate) {
        const regDate = moment(eventdoc?.registrationEndDate);
        setEndDate(regDate.toDate());
        setEndTime(regDate.format('HH:mm'));
      }
      initializeForm();
    }, [eventdoc, docs]);









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



 const eventTypeOptions = [
  { id: 1, title: "Program", value: "program" },
  { id: 2, title: "Community", value: "community" },
  { id: 3, title: "Fundraiser", value: "fundraiser" },
];





const eventSubTypeOptions = [
  { id: 1, title: "Camp", value: "camp" },
  { id: 2, title: "Yes Session", value: "yes_session" },
  { id: 3, title: "Workshop", value: "workshop" },
  { id: 4, title: "Wellness Event", value: "wellness_event" },
  { id: 5, title: "Other", value: "other" },
];

const resetForm = () => {
  setFormData({
    title: '',
       slug:"",
    shortDescription:'',
      eventType:'',
    eventSubtype:'',
    piller: '',
    category: '',
    program: '',
     locationName:'',
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
    isVirtual: false ,
autoArchive:false,
status:false,
  });
     dispatch(setCompanyInfo(null)); 
    dispatch(resetMultipleCompanyDetails());
   setEventDate(null);
  setEventTime('');
  setEventEndDate(null);
  setEventEndTime('');
  setStartDate(null);
  setStartTime('');
  setEndDate(null);
  setEndTime('');
  setImagePreview('');
  setErrors({});
};



    // console.log('sponsoredBy',formData?.sponsoredBy)

const handleSubmit = async () => {
  const validationErrors = validateUpdateEventForm(formData,eventDate, eventTime,eventEndDate,eventEndTime, startDate, startTime, endDate, endTime);
  setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
    toast.error("Please fix the highlighted errors");
    return;
  }


      const eventDateTime = combineDateTime(eventDate, eventTime);
        const eventEndDateTime = combineDateTime(eventEndDate, eventEndTime);
  const startDateTime = combineDateTime(startDate, startTime);
  const endDateTime = combineDateTime(endDate, endTime);

  try {
      const galleryUrls = formData.gallery?.length
      ? formData.gallery.map(item => item.url)
      : [];
       const sponsored = formData.sponsoredBy?.length
      ? formData.sponsoredBy.map(item => item?._id)
      : [];
          const teams = formData.team?.length
      ? formData.team.map(item => item?._id)
      : [];
    const payload = {

        ...(formData.title && {
         title: formData.title,
      }),
   
      ...(formData.category?._id && {
        category:formData.category?._id,
      }),
       
           ...(eventDateTime && { eventStartDate: eventDateTime }),
    ...(eventEndDateTime && { eventEndDate: eventEndDateTime }),

           ...(formData.slug && {
          slug:formData.slug, 
      }),

        ...(formData.shortDescription && {
          shortDescription:formData.shortDescription, 
      }),
  
  ...(formData.eventSubtype && {
          eventSubtype:formData.eventSubtype, 
      }),

        ...(formData.eventType && {
           eventType:formData.eventType,
      }),
  

      
       
      ...(eventDateTime && { eventDate: eventDateTime }),
  ...(startDateTime && { registrationStartDate: startDateTime }),
  ...(endDateTime && { registrationEndDate: endDateTime }),

  

  ...(formData.waitlistEnabled && {
       waitlistEnabled: formData.waitlistEnabled,
      }),

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

        ...(formData.locationName && {
        locationName: formData.locationName,
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
       isVirtual:formData.isVirtual, 
    autoArchive:formData.autoArchive, 
  ...(formData.status && { status: "published" }),
  ...(teams.length > 0 && {
        team: teams,
      }),
      
    };

    console.log('this is  payload',payload)


    
       await dispatch(update_Events(id,payload, toast, navigate));
    queryClient.invalidateQueries('fetch-all-event');
        queryClient.invalidateQueries('fetch-singleEvent');
    
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
   <InputName
            label="Slug"
            value={formData.slug}
            onChange={handleChange("slug")}
            error={errors.slug}
          />


           
          <div className='sm:col-span-2'>
            <InputName
            label="Short Description"
            value={formData.shortDescription}
            onChange={handleChange("shortDescription")}
            error={errors.shortDescription}
          />

          </div>


                 <InputOption 
            label="Event Type"  
            name="eventType"
            value={formData.eventType}
            options={eventTypeOptions}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, eventType: val }));
          
              if (errors.eventType) {
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.eventType;
                  return updated;
                });
              }
            }}
            error={errors.eventType}
          />
          
          <InputOption 
            label="Event Sub Type"  
            name="eventSubtype"
            value={formData.eventSubtype}
            options={eventSubTypeOptions}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, eventSubtype: val }));
          
              if (errors.eventSubtype) {
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.eventSubtype;
                  return updated;
                });
              }
            }}
            error={errors.eventSubtype}
          />

           <DateInput
                          label="Event Start Date"
                          value={{ date: eventDate, time: eventTime }}
                          onDateChange={handleDateChange('eventDate', setEventDate)}
                          onTimeChange={handleDateChange('eventTime', setEventTime)}
                          error={errors.eventDate  ||errors.eventTime}
                        />  
                          <DateInput
                          label="Event End Date"
                          value={{ date: eventEndDate, time: eventEndTime }}
                          onDateChange={handleDateChange('eventEndDate', setEventEndDate)}
                          onTimeChange={handleDateChange('eventEndTime', setEventEndTime)}
                          error={errors.eventEndDate  ||errors.eventEndTime}
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

  


       <InputNumber
            label="Capcity"
            value={formData.capacity}
            onChange={handleChange("capacity")}
            error={errors.capacity}
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
            onChange={(images, removedImage) => {
          
              if (removedImage?.isExisting && removedImage?._id) {
                dispatch(delete_EventImages(removedImage._id, toast));
              }
          
              setFormData((prev) => ({
                ...prev,
                gallery: images,
              }));
            }}
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
           label="Location Name"
           value={formData.locationName}
           onChange={handleChange("locationName")}
           error={errors.locationName}
         />
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
     
  

     </div>

    </div>

     <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5  w-full pb-12 border-b px-5 border-black/40">
     <div className="  w-full xl:w-[25%]   flex flex-col gap-0.5">
        <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">Team Details</h2>
        <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
          Build trust by showing who's part of this team
        </p>
        
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 ">    
        <div className='sm:col-span-2'>
                  <TeamsInput

            label="Team"
          value={formData.team}
          onChange={(team) => {
            setFormData((prev) => ({ ...prev, team }));

            setErrors((prev) => {
              const updated = { ...prev };
              delete updated.team;
              return updated;
            });
          }}
          error={errors.team}
        />
           <div className=' w-full grid grid-cols-1 sm:grid-cols-2  mt-5 gap-2.5'>
            {multipleTeamDetails && multipleTeamDetails.length > 0 && (
                <>

            {multipleTeamDetails.map((item, index) => (
                <TeamCard key={index} doc={item}  width={'w-full  '} />
              ))}
                </>
            
            
          )}

           </div>
        
        </div>


        

        <InputName
                    label="Cta Label"
                    value={formData.ctaLabel}
                    onChange={handleChange("ctaLabel")}
                    error={errors.ctaLabel}
                  />

                <div className='sm:col-span-2  space-y-3'>
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
  {

   formData.eventType   ==='program'   && (
      <div className="flex items-center gap-3">
                  <input
                type="checkbox"
                id="isVirtual"
                checked={formData.isVirtual}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isVirtual: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-black cursor-pointer"
              />
                  <label htmlFor="isVirtual" className="font-medium  text-xs sm:text-sm text-black/80">
              Is Virtual   
              </label>
                </div>

   )

  }
              

  {

   formData.eventType   ==='program'   && (
                <div className="flex items-center gap-3">
                  <input
                type="checkbox"
                id="autoArchive"
                checked={formData.autoArchive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    autoArchive: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-black cursor-pointer"
              />
                  <label htmlFor="autoArchive" className="font-medium  text-xs sm:text-sm text-black/80">
              Auto Archive
              </label>
                </div>
   )}



                  <div className="flex items-center gap-3">
                  <input
                type="checkbox"
                id="status"
                checked={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-black cursor-pointer"
              />
                  <label htmlFor="status" className="font-medium  text-xs sm:text-sm text-black/80">
              Status </label>
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