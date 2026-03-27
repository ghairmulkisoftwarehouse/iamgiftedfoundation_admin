

import { useState,useEffect } from 'react';
import ImageUpload   from '../../global/form/ImageUpload';
import InputName  from '../../global/form/InputName';
import InputNumber from '../../global/form/InputNumber';

import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from '../../global/form/MultipleImage';
import {validateEventForm} from '../../../validations/eventValidation'
import  {Add_Event} from '../../../redux/actions/eventActions';
import { useDispatch,useSelector } from 'react-redux';
import SubmitLoading   from '../../../components/global/SubmitLoading';
import { useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import { useNavigate } from 'react-router-dom';
import DateInput  from '../../../components/global/form/DateInput';
import { combineDateTime } from '../../../utils/combineDateTime';
import ProgramSelectInput   from './eventFrom/ProgramSelectInput';
import PillerSelectInput    from '../../../components/global/form/PillerSelectInput';
import PillerSelectedInput   from './eventFrom/PillerSelectedInput';
import OrganizationInput   from './eventFrom/OrganizationInput';
import CompanyCard   from './eventFrom/CompanyCard'
import { setStats,setCompanyInfo,resetMultipleCompanyDetails } from '../../../redux/slices/companySlice';
import { resetMultipleTeamDetails } from '../../../redux/slices/teamSlice';

import { useLocation } from "react-router-dom";
import InputTags   from './eventFrom/InputTags';
import InputOption    from './eventFrom/InputOption';
import TeamsInput    from './eventFrom/TeamsInput';
import  TeamCard  from './eventFrom/TeamCard';
import { MdDelete } from "react-icons/md";



const EventsForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const  navigate =useNavigate();
    const location = useLocation();

  const { createLoading } = useSelector((state) => state.event);
  const { companyInfo ,multipleCompanyDetails} = useSelector((state) => state.company);
  const {  multipleTeamDetails} = useSelector((state) => state.team);

  const [activeTab, setActiveTab] = useState("tickets");

const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

const [eventDate, setEventDate] = useState(null);
const [eventTime, setEventTime] = useState('');
const [eventEndDate, setEventEndDate] = useState(null);
const [eventEndTime, setEventEndTime] = useState('');



const [startDate, setStartDate] = useState(null);
const [startTime, setStartTime] = useState('');
const [endDate, setEndDate] = useState(null);
const [endTime, setEndTime] = useState('');



  const eventTypeOptions = [
  { id: 1, title: "Program", value: "program" },
  { id: 2, title: "Community", value: "community" },
  { id: 3, title: "Fundraiser", value: "fundraiser" },
];


 const tabs = [
 
    { id: "tickets", label: "Ticket Details" },
    { id: "sponsorship", label: "Sponsorship" },
  ];


const eventSubTypeOptions = [
  { id: 1, title: "Camp", value: "camp" },
  { id: 2, title: "Yes Session", value: "yes_session" },
  { id: 3, title: "Workshop", value: "workshop" },
  { id: 4, title: "Wellness Event", value: "wellness_event" },
  { id: 5, title: "Other", value: "other" },
];

 


  const [formData, setFormData] = useState({
    title: '',
    slug:"",
    shortDescription:'',
    eventType:'',
    eventSubtype:'',
    piller:"",
    category:'',
    program:'',
  ctaLabel:'',
   locationName:'',
    address:"",
    city:"",
    state:"", 
    coverImage: null,  
    description: '',
    gallery: [],
    sponsoredBy: [],
    team:[],
  ticketDetails: [
    {
      title: '',
      description: '',
      price: '',
      currency: '', 
      quantity: '',
      saleStartDate: null,
      saleStartTime:"",
       saleEndDate: null,
      saleEndTime:"",
      // isActive: false,
    },
  ],
    sponsorshipTiles: [
   {
      title: '',
      description: '',
      amount: '',
      currency: '', 
      sortOrder:"",  
    },

    ],
capacity:'',
hostedBy:'',
waitlistEnabled: false ,
isVirtual: false ,
autoArchive:false,
status:false,


  });

// console.log("Ticket Details:", formData.ticketDetails);
// console.log("Sponsorship Tiles:", formData.sponsorshipTiles);
  
const isPillerEditable = formData.category?.title === "Program";


// console.log(' this is a   eventType',formData.eventType);


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


const handleTicketDateChange = (index, field) => (value) => {
  const newTickets = [...formData.ticketDetails];
  newTickets[index][field] = value;
  setFormData({ ...formData, ticketDetails: newTickets });

  if (errors?.ticketDetails?.[index]?.[field]) {
    const updated = { ...errors };
    delete updated.ticketDetails[index][field];
    setErrors(updated);
  }
};
const handleSponsorChange = (index, field, value) => {
  const newSponsors = [...formData.sponsorshipTiles];
  newSponsors[index][field] = value;
  setFormData({ ...formData, sponsorshipTiles: newSponsors });

  if (errors?.sponsorshipTiles?.[index]?.[field]) {
    setErrors((prev) => {
      const updated = { ...prev };
      updated.sponsorshipTiles = [...(updated.sponsorshipTiles || [])];

      if (updated.sponsorshipTiles[index]) {
        delete updated.sponsorshipTiles[index][field];

        if (Object.keys(updated.sponsorshipTiles[index]).length === 0) {
          updated.sponsorshipTiles.splice(index, 1);
        }
      }
      return updated;
    });
  }
};


const handleTicketChange = (index, field, value) => {
  const newTickets = [...formData.ticketDetails];

  if (field === "description" && (value === "<p><br></p>" || value === "<p></p>")) {
    value = "";
  }

  newTickets[index][field] = value;
  setFormData({ ...formData, ticketDetails: newTickets });

  // Remove error if exists
  if (errors?.ticketDetails?.[index]?.[field]) {
    setErrors((prev) => {
      const updated = { ...prev };
      updated.ticketDetails = [...(updated.ticketDetails || [])];
      if (updated.ticketDetails[index]) {
        delete updated.ticketDetails[index][field];
        if (Object.keys(updated.ticketDetails[index]).length === 0) {
          updated.ticketDetails.splice(index, 1);
        }
      }
      return updated;
    });
  }
};

const resetForm = () => {
  setFormData({
    title: '',
    slug: '',
    shortDescription: '',
    piller: '',
    eventType: '',
    eventSubtype: '',
    category: '',
    program: '',
    ctaLabel: '',
    locationName: '',
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
    isVirtual: false,
    autoArchive: false,
    status: false,
    ticketDetails: [
      {
        title: '',
        description: '',
        price: '',
        currency: 'USD',
        quantity: '',
        saleStartDate: null,
        saleStartTime: '',
        saleEndDate: null,
        saleEndTime: '',
        isActive: true,
      },
    ],
    sponsorshipTiles: [
      {
        title: '',
        description: '',
        amount: '',
        currency: 'USD',
        sortOrder: '',
      },
    ],
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
 useEffect(() => {
    if (location.pathname !== "/app/create-events") {
      dispatch(setCompanyInfo(null));
   
    }
       dispatch(setCompanyInfo(null)); 
  }, [location.pathname, dispatch]);

  useEffect(() => {
  if (location.pathname !== "/app/create-events") {
    dispatch(resetMultipleCompanyDetails());
  }
         dispatch(resetMultipleCompanyDetails(null)); 
          dispatch(resetMultipleTeamDetails(null))
}, [location.pathname, dispatch]);





const handleSubmit = async () => {
  const validationErrors = validateEventForm(formData,eventDate, eventTime,eventEndDate,eventEndTime,   startDate, startTime, endDate, endTime);
    console.log("Validation Errors:", validationErrors);

  setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
    toast.error("Please fix the highlighted errors");
    return;
  }


    const eventDateTime = combineDateTime(eventDate, eventTime);
        const eventEndDateTime = combineDateTime(eventEndDate, eventEndTime);

  const startDateTime = combineDateTime(startDate, startTime);
  const endDateTime = combineDateTime(endDate, endTime);


  const ticketDetails = formData.ticketDetails?.length
      ? formData.ticketDetails.filter(td =>
          Object.values(td).some(v => v !== "" && v !== null && v !== undefined)
        ).map(td => ({
          title: td.title,
        ...(td.description ? { description: td.description } : {}),
          price: Number(td.price),
          currency: td.currency || "USD",
          quantity: Number(td.quantity),
          saleStartDate: combineDateTime(td.saleStartDate, td.saleStartTime),
          saleEndDate: combineDateTime(td.saleEndDate, td.saleEndTime),
          isActive: td.isActive ?? true,
        }))
      : [];

    const sponsorshipTiles = formData.sponsorshipTiles?.length
      ? formData.sponsorshipTiles.filter(st =>
          Object.values(st).some(v => v !== "" && v !== null && v !== undefined)
        ).map(st => ({
          title: st.title,
          description: st.description,
          amount: Number(st.amount),
          currency: st.currency || "USD",
          ctaLabel: st.ctaLabel,
          sortOrder: Number(st.sortOrder),
        }))
      : [];

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
      title: formData.title,

...(formData.category && {
        category:formData.category?._id,
      }),

       eventStartDate: eventDateTime,
    ...(eventEndDateTime && { eventEndDate: eventEndDateTime }),

       registrationStartDate: startDateTime,
      registrationEndDate: endDateTime,
      
  eventType:formData.eventType, 
  
  ...(formData.eventSubtype && {
          eventSubtype:formData.eventSubtype, 
      }),
  


        ...(formData.slug && {
          slug:formData.slug, 
      }),

        ...(formData.shortDescription && {
          shortDescription:formData.shortDescription, 
      }),

  waitlistEnabled: formData.waitlistEnabled, 
  isVirtual:formData.isVirtual, 
    autoArchive:formData.autoArchive, 
  ...(formData.status && { status: "published" }),
        ...(formData.hostedBy && {
        hostedBy: formData.hostedBy?._id,
      }),


        ...(formData.ctaLabel && {
        ctaLabel: formData.ctaLabel,
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


      ...(teams.length > 0 && {
        team: teams,
      }),

            ...(ticketDetails.length > 0 && { ticketDetails }),
      ...(sponsorshipTiles.length > 0 && { sponsorshipTiles }),


      
    };

    devLog('this is payload', payload);

    //    await dispatch(Add_Event(payload, toast, navigate));
    // queryClient.invalidateQueries('fetch-all-event');
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


 {(formData.eventType === 'program' || formData.eventType === 'community') && (
  <ProgramSelectInput
    label="Category"
    selected={formData.category}
    onSelect={handleSelectChange("category")}
    error={errors.category}
  />
)}


{formData.eventType === 'program' && (
  <PillerSelectInput
    label="Piller"
    selected={formData.piller}
    onSelect={handleSelectChange("piller")}
    error={errors.piller}
    readOnly={!isPillerEditable}
  />
)}
           
{formData.eventType === 'program' && (
                    <PillerSelectedInput
                  readOnly={!formData.piller} 
                    selected={formData.piller} 
                  label="Program"
                  value={formData.program}
                  onSelect={handleSelectChange("program")}
                  error={errors.program}
                />
)}
              
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

{
  formData.eventType === 'fundraiser' && (
    <div className="w-full ">
      <div className="flex gap-2 border-b border-black/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer transition ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black"
                : "text-black/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
{
 formData.eventType === 'fundraiser' && activeTab === 'tickets'  && (

    
    <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
  <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
    <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
      Ticket Details
    </h2>
    <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
      Provide clear information about ticket types, pricing, and availability so attendees know exactly what to expect.
    </p>
  </div>

  <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
    {formData.ticketDetails.map((ticket, index) => (
      <div key={index} className="sm:col-span-2 p-4 rounded-md relative">
        {index !== 0 && (
          <button
            type="button"
            onClick={() => {
              const newTickets = formData.ticketDetails.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, ticketDetails: newTickets });
            }}
            className="absolute top-[-4px] right-4 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <MdDelete />
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 pt-3">
          <InputName
  label="Ticket Title"
  value={ticket.title}
  onChange={(e) => handleTicketChange(index, "title", e.target.value)}
  error={errors?.ticketDetails?.[index]?.title}
/>

       <InputName
  label="Price"
  value={ticket.price}
  onChange={(e) => handleTicketChange(index, "price", e.target.value)}
  error={errors?.ticketDetails?.[index]?.price}
/>


        
<InputName
  label="Quantity"
  value={ticket.quantity}
  onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
  error={errors?.ticketDetails?.[index]?.quantity}
/>

          {/* <InputName
            label="Currency"
            value={ticket.currency}
            onChange={(e) => {
              const newTickets = [...formData.ticketDetails];
              newTickets[index].currency = e.target.value;
              setFormData({ ...formData, ticketDetails: newTickets });
            }}
            error={errors?.ticketDetails?.[index]?.currency}
          /> */}

          <DateInput
            label="Sale Start Date"
            value={{ date: ticket.saleStartDate, time: ticket.saleStartTime }}
            onDateChange={handleTicketDateChange(index, "saleStartDate")}
            onTimeChange={handleTicketDateChange(index, "saleStartTime")}
            error={
              errors?.ticketDetails?.[index]?.saleStartDate ||
              errors?.ticketDetails?.[index]?.saleStartTime
            }
          />

          <DateInput
            label="Sale End Date"
            value={{ date: ticket.saleEndDate, time: ticket.saleEndTime }}
            onDateChange={handleTicketDateChange(index, "saleEndDate")}
            onTimeChange={handleTicketDateChange(index, "saleEndTime")}
            error={
              errors?.ticketDetails?.[index]?.saleEndDate ||
              errors?.ticketDetails?.[index]?.saleEndTime
            }
          />

          <div className="sm:col-span-2">
            <ErrorBoundary>
             <Editor
  content={ticket.description}
  setContent={(value) => handleTicketChange(index, "description", value)}
  error={errors?.ticketDetails?.[index]?.description}
/>
            </ErrorBoundary>
          </div>

          <div className="sm:col-span-2 flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id={`isActive-${index}`}
              checked={ticket.isActive}
              onChange={(e) => {
                const newTickets = [...formData.ticketDetails];
                newTickets[index].isActive = e.target.checked;
                setFormData({ ...formData, ticketDetails: newTickets });
              }}
              className="w-4 h-4 accent-black cursor-pointer"
            />

            <label
              htmlFor={`isActive-${index}`}
              className="font-medium text-xs sm:text-sm text-black/80"
            >
              Active
            </label>
          </div>
        </div>
      </div>
    ))}

    <div className="sm:col-span-2 mt-2">
      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            ticketDetails: [
              ...formData.ticketDetails,
              {
                title: "",
                description: "",
                price: "",
                currency: "USD",
                quantity: "",
                saleStartDate: null,
                saleEndDate: null,
                isActive: true,
              },
            ],
          });
        }}
        className="btn-primary rounded-md px-2.5 h-[40px] text-sm"
      >
        + Add Ticket
      </button>
    </div>
  </div>
</div>

  )
}




{/* Sponsorship  */}

{
  formData.eventType === 'fundraiser' && activeTab === 'sponsorship' && (
<div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-4 border-b px-5 border-black/40">
  <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
    <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
      Sponsorship Tiles
    </h2>
    <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
      Provide clear information about sponsorship levels, benefits, and pricing so potential sponsors know what they can gain from supporting your event.
    </p>
  </div>

  <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
    {formData.sponsorshipTiles.map((sponsor, index) => (
      <div key={index} className="sm:col-span-2 p-4 rounded-md relative ">
        {index !== 0 && (
          <button
            type="button"
            onClick={() => {
              const newSponsors = formData.sponsorshipTiles.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, sponsorshipTiles: newSponsors });
            }}
            className="absolute top-[-4px] right-4 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <MdDelete />
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 pt-2">
      <InputName
  label="Title"
  value={sponsor.title}
  onChange={(e) => handleSponsorChange(index, "title", e.target.value)}
  error={errors?.sponsorshipTiles?.[index]?.title}
/>







<InputName
  label="Amount"
  value={sponsor.amount}
  onChange={(e) => handleSponsorChange(index, "amount", e.target.value)}
  error={errors?.sponsorshipTiles?.[index]?.amount}
/>

<InputName
  label="CTA Label"
  value={sponsor.ctaLabel}
  onChange={(e) => handleSponsorChange(index, "ctaLabel", e.target.value)}
  error={errors?.sponsorshipTiles?.[index]?.ctaLabel}
/>


<div className="sm:col-span-2">
            <ErrorBoundary>
             <Editor
  content={sponsor.description}
  setContent={(value) => handleSponsorChange(index, "description", value)}
  error={errors?.sponsorshipTiles?.[index]?.description}
/>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    ))}

    <div className="sm:col-span-2 mt-0 px-4">
      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            sponsorshipTiles: [
              ...formData.sponsorshipTiles,
              {
                title: "",
                description: "",
                amount: 0,
                currency: "USD",
                ctaLabel: "",
                sortOrder: formData.sponsorshipTiles.length + 1,
              },
            ],
          });
        }}
        className="btn-primary rounded-md px-2.5 h-[40px] text-sm"
      >
        + Add Sponsorship
      </button>
    </div>
  </div>
</div>
  )}


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
                ${createLoading ? 'opacity-60 cursor-not-allowed' : ''}`}

          
        >
          {createLoading ? <SubmitLoading size={12} /> : 'Create Event'}

        </button>


      
      </div>
    
    </div>
  )
}

export default EventsForm