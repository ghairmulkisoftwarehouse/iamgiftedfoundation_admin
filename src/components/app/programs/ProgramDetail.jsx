import BloodTestSvg from '../../../assets/svgs/BloodTestSvg';
import { RxCross1 } from "react-icons/rx";
import DotSvg from '../../../assets/svgs/DotSvg';
import devLog from '../../../utils/logsHelper';
import { baseURL } from '../../../config/api';
import img from '../../../assets/images/img1.jpg';
import DOMPurify from "dompurify";
import moment from 'moment/moment';


const ProgramDetail = ({programDetail,setDetail}) => {
    devLog(' this is a eventDetail',programDetail)

 const startDate = programDetail?.startDate
  ? moment.utc(programDetail.startDate).format('MMM DD, YYYY')
  : 'N/A';

const startTime =    programDetail?.startDate ? moment.utc(programDetail.startDate).format('hh:mm A')  : 'N/A';

  const endDate = programDetail?.endDate
    ? moment.utc(programDetail.endDate).format('MMM DD, YYYY')
    : 'N/A';

  // Calculate days left if endDate exists
  const daysLeft =
    programDetail?.endDate && moment(programDetail.endDate).isAfter(moment())
      ? moment(programDetail.endDate).diff(moment(), 'days')
      : 0;


  return (
      <div className="bg-white rounded-[15px] p-4 flex flex-col gap-4">
      <div className=' flex justify-between items-center w-full'>
        <div
            className="
              font-medium text-sm flex items-center gap-1
              px-3 py-1.5 rounded-full bg-[#E5D5E5]

              transition-all duration-500
              group-hover:bg-[#d6bfd6]
              group-hover:shadow-sm
            "
          >
            <DotSvg />
           Active
          </div>
             <button   
               onClick={()=>setDetail(true)}
            className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-black hover:bg-primary/20 flex items-center justify-center  cursor-pointer"
          >
          <RxCross1/>
          </button>
          



      </div>
      <h2 className=' font-medium text-base md:text-lg leading-7'>{programDetail?.title}</h2>
        
        <div className='bg-[#F4F6F6]  rounded-[15px] flex flex-col gap-2'>
        <div className=' w-full  h-[212px]  rounded-[16px] overflow-hidden'>
        <img 
         src={programDetail.featuredImage?.relativeAddress ? `${baseURL}/${programDetail?.featuredImage?.relativeAddress}` : img}
                     alt={programDetail.title}
          
          className=' w-full   h-full object-cover'/>

        </div>
       <div className="grid grid-cols-2 gap-2 w-full p-4">
          <div className="bg-white py-3 rounded-[12px] flex flex-col items-center gap-0.5 cursor-pointer transition-all duration-700 ease-in-out hover:shadow-md hover:-translate-y-0.5">
       
            <h2 className="text-xs xs:text-[13px]  font-semibold">{startDate} </h2>
             <h2 className="text-xs xs:text-[13px]  font-semibold">{startTime} </h2>  
            <p className="text-xs xs:text-[13px] sm:text-sm text-black/60">Date and Time</p>
          </div>

          <div className="bg-white py-3 rounded-[12px] flex flex-col items-center gap-0.5 cursor-pointer transition-all duration-700 ease-in-out hover:shadow-md hover:-translate-y-0.5">
            <h2 className="text-xs xs:text-[13px] font-semibold">{daysLeft}</h2>
            <p className="text-xs xs:text-[13px] sm:text-sm text-black/60">Days Left</p>
          </div>
        </div>

    

        </div>

      <div className=" grid grid-cols-1  gap-4">
        {/* Organizer card */}
       
           <div className="flex flex-col gap-2.5 bg-[#F4F6F6] px-3 py-3 rounded-[15px]">
          <h2 className="font-medium text-sm md:text-base">Organizer:</h2>

          <div className="bg-white px-3 py-3 rounded-[15px] flex flex-row gap-2.5 items-center">
            <div className="w-[35px] h-[35px] bg-[#F4F6F6] rounded-full flex justify-center items-center">
              <BloodTestSvg />
            </div>

            <div className="flex flex-col gap-0.5">
              <h2 className="font-medium text-[13px] md:text-sm">
              N/A
              </h2>
              <p className="text-[10px] md:text-xs text-[#878787]">
              N/A
              </p>
            </div>
          </div>
        </div>


 
       <div className=' flex flex-col gap-1'>
        <h2 className=' text-[13px] sm:text-sm  font-medium'>Story</h2>

      <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(programDetail?.body) }}
      className="text-black/90    text-xs sm:text-[13px]  leading-6"
    />

       

       </div>
        
      

      </div>
    </div>
  )
}

export default ProgramDetail