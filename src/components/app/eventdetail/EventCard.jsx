
import { useState } from 'react';
import img from '../../../assets/images/img1.jpg'
import DotSvg from '../../../assets/svgs/DotSvg';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { baseURL } from '../../../config/api';
import DOMPurify from "dompurify";

const EventCard = () => {
const [activeIndex, setActiveIndex] = useState(-1);
const { docDetails } = useSelector(state => state.event);


  const eventdoc=docDetails?.doc;


   const eventDate = eventdoc?.eventDate
    ? moment(eventdoc.eventDate).format('MMM DD, YYYY')
    : 'N/A';

    const registrationStartDate = eventdoc?.registrationStartDate
  ? moment(eventdoc.registrationStartDate).format('MMM DD, YYYY')
  : null;

const registrationEndDate = eventdoc?.registrationEndDate
  ? moment(eventdoc.registrationEndDate).format('MMM DD, YYYY')
  : null;


  const registrationStartTime = eventdoc?.registrationStartDate
  ? moment(eventdoc.registrationStartDate).format('hh:mm A')
  : null;

const registrationEndTime = eventdoc?.registrationEndDate
  ? moment(eventdoc.registrationEndDate).format('hh:mm A')
  : null;

  
  const eventTime =     eventdoc?.eventDate ? moment( eventdoc?.eventDate).format('hh:mm A')  : 'N/A';
const capacity =eventdoc?.capacity;       
const registeredCount = eventdoc?.registeredCount; 

const isInfinite = capacity === null;

// Progress calculation
const progressPercent =
  !isInfinite && capacity > 0
    ? Math.min((registeredCount / capacity) * 100, 100)
    : 100;


  const mainImage = 
  activeIndex === -1
    ? eventdoc?.featuredImage?.relativeAddress
    : eventdoc?.images?.[activeIndex]?.relativeAddress;
  

  return (
    <div  className=" bg-white w-full flex flex flex-col gap-2  p-4   rounded-[15px]">
       <div className="   rounded-[15px] w-full h-[250px]  sm:h-[200px] xl:h-[300px] overflow-hidden">
            <img
               src={mainImage ? `${baseURL}/${mainImage}` : img} 
                   alt={eventdoc?.title}
            className="
                w-full h-full object-cover
                transition-transform duration-700 ease-in-out
                hover:scale-105
            "
            />
        </div>



        
 <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-3 pt-3.5">
      {/* Featured Image Thumbnail */}
      {eventdoc?.featuredImage?.relativeAddress && (
        <div
          onClick={() => setActiveIndex(-1)}
          className="sm:w-[140px] h-[90px] rounded-[10px] overflow-hidden relative group cursor-pointer"
        >
          <img
            src={`${baseURL}/${eventdoc.featuredImage.relativeAddress}`}
            alt="featured"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px]" />
        </div>
      )}

      {/* Other Images Thumbnails */}
      {eventdoc?.images?.length > 0 &&
        eventdoc.images.map((img, index) => (
          <div
            key={img._id}
            onClick={() => setActiveIndex(index)}
            className="sm:w-[140px] h-[90px] rounded-[10px] overflow-hidden relative group cursor-pointer"
          >
            <img
              src={`${baseURL}/${img.relativeAddress}`}
              alt={`img-${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px]" />
          </div>
        ))}
    </div>

  {/* <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-3 pt-3.5">
  {eventdoc?.images && eventdoc.images.length > 0 && (
    eventdoc?.images.map((img, index) => (
      <div
        key={img?._id}
            onClick={() => setActiveIndex(index)}
        className="sm:w-[140px] h-[90px] rounded-[10px] overflow-hidden relative group cursor-pointer"
      >
        <img
          src={`${baseURL}/${img?.relativeAddress}`} 
          alt={`img-${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px]" />
      </div>
    ))
  )}
</div> */}



      
      <div className='   w-full flex flex-col   gap-2'>
            
                 
                 <div className=' text-[15px]  sm:text-base xl:text-lg font-medium'>
                     {eventdoc.title}
                 </div>
                 
      <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eventdoc?.body) }}
      className="text-black/90    text-xs sm:text-[13px]  leading-6"
    />
                  
                  <div className='flex flex-col gap-0.5'>
                  <div className="flex justify-between items-center w-full  font-medium">
                    <p className="text-black text-[10px] xs:text-xs md:text-sm">
Progress: {isInfinite ? 'Unlimited' : `${Math.round(progressPercent)}%`}
</p>

<div>
  <span className="font-medium text-sm sm:text-base">
    {registeredCount}
  </span>
  <span className="text-xs sm:text-sm text-black/60 font-medium">
    /{isInfinite ? '∞' : capacity}
  </span>
</div>
            
              </div>
               <div className="w-full bg-[#B2BCC599] rounded-full h-2 overflow-hidden">
  <div
    className="bg-[#9BD6F6] h-2 rounded-full transition-all duration-700 ease-in-out"
    style={{ width: `${progressPercent}%` }}
  />
</div>

                  </div> 
    

                  <div className=' w-full  flex flex-col xs:flex-row  xs:flex-wrap gap-2.5  pt-3'>
                  <div className='   w-full  xs:w-fit  px-4   md:px-0  md:w-[180px]        rounded-[10px] bg-[#F4F9FD] py-4
                            flex flex-col items-center justify-center
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 hover:shadow-lg hover:bg-white
                            cursor-pointer'>
                  <p className=' text-xs md:text-sm text-black/60'  >Date and Time</p>
                  <h2 className=' font-medium text-[11px] md:text-[13px] md:text-base '>{eventDate}</h2>
                      <h2 className=' font-medium text-[11px] md:text-[13px] md:text-base '>   {eventTime}</h2>
                 

                  </div>
     {(registrationStartDate || registrationEndDate) && (
  <div
    className="w-full xs:w-fit px-4 md:px-0 md:w-[180px] rounded-[10px] bg-[#F4F9FD] py-4
    flex flex-col items-center justify-center
    transition-all duration-300 ease-in-out
    hover:-translate-y-1 hover:shadow-lg hover:bg-white
    cursor-pointer"
  >
    <p className="text-xs md:text-sm text-black/60">Registration Period</p>

    {registrationStartDate && (
      <h2 className="font-medium text-[11px] md:text-[13px] md:text-base">
        Start: {registrationStartDate} {registrationStartTime && `at ${registrationStartTime}`}
      </h2>
    )}

    {registrationEndDate && (
      <h2 className="font-medium text-[11px] md:text-[13px] md:text-base">
        End: {registrationEndDate} {registrationEndTime && `at ${registrationEndTime}`}
      </h2>
    )}
  </div>
)}



                {eventdoc?.address && (
  <div
    className="w-full xs:w-fit px-4 md:px-2 md:w-[200px] rounded-[10px] bg-[#F4F9FD] py-4
    flex flex-col items-center justify-center
    transition-all duration-300 ease-in-out
    hover:-translate-y-1 hover:shadow-lg hover:bg-white
    cursor-pointer"
  >
    <p className="text-xs md:text-sm text-black/60">Address</p>

    <h2 className="font-medium text-[11px] md:text-[13px] md:text-base text-center">
      {[eventdoc?.address, eventdoc?.city, eventdoc?.state]
        .filter(Boolean)
        .join(', ')}
    </h2>
  </div>
)}

                

{
  eventdoc?.hostedBy   && (
   <div className='    w-full  xs:w-fit  px-4   md:px-1  md:w-[180px]       rounded-[10px] bg-[#F4F9FD] py-4
                            flex flex-col items-center justify-center
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 hover:shadow-lg hover:bg-white
                            cursor-pointer'>
                             <p className=' text-xs md:text-sm text-black/60'  >Organizer</p>
                  <h2 className=' font-medium text-[11px] md:text-[13px] md:text-base '>{eventdoc?.hostedBy?.title} </h2>

                  </div>
  )
}
                  
                 
                  </div>
               

     
{
  eventdoc?.category?.title  &&
  (

    <div className='flex flex-col gap-0.5'>
                 <h2 className=' capitalize     text-xs  xs:text-sm    md:text-[15px]  font-semibold'>  category</h2>  
              <p className="text-black text-[10px] xs:text-xs md:text-sm">
    {eventdoc?.category?.title}
</p>
                  </div>
  )
}


      {
  eventdoc?.piller?.title  &&
  (

    <div className='flex flex-col gap-0.5'>
                 <h2 className=' capitalize     text-xs  xs:text-sm    md:text-[15px]  font-semibold'>  Piller</h2>  
              <p className="text-black text-[10px] xs:text-xs md:text-sm">
    {eventdoc?.piller?.title}
</p>
                  </div>
  )
}   

   {
  eventdoc?.program?.title  &&
  (

    <div className='flex flex-col gap-0.5'>
                 <h2 className=' capitalize     text-xs  xs:text-sm    md:text-[15px]  font-semibold'>  Program</h2>  
              <p className="text-black text-[10px] xs:text-xs md:text-sm">
    {eventdoc?.program?.title}
</p>
                  </div>
  )
}    


{
  eventdoc?.program?.title  &&
  (

    <div className='flex flex-col gap-0.5'>
                 <h2 className=' capitalize     text-xs  xs:text-sm    md:text-[15px]  font-semibold'>  Program</h2>  
              <p className="text-black text-[10px] xs:text-xs md:text-sm">
    {eventdoc?.program?.title}
</p>
                  </div>
  )
}    


{eventdoc?.sponsoredBy && eventdoc?.sponsoredBy.length > 0 && (
  <div className="flex flex-row items-center gap-2 text-sm flex-wrap">
    <h2 className="capitalize     text-xs  xs:text-sm    md:text-[15px]  font-semibold">Supported By:</h2>
    <p className="text-black text-[10px] xs:text-xs md:text-sm">
      {eventdoc?.sponsoredBy.map((sponsor, index) => (
        <span key={sponsor?._id}>
          {sponsor.title}
          {index < eventdoc.sponsoredBy.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  </div>
)}


      </div>
    </div>
  )
}

export default EventCard