import Search from '../../global/Search';
import Titlebtn from '../../global/Titlebtn';
import img from '../../../assets/images/programimg.png';
import DotSvg from '../../../assets/svgs/DotSvg';
import { FaRegClock } from 'react-icons/fa';
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import { useNavigate } from 'react-router-dom';




const cardsData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Clean Water for Every Village",
  organizer: "AquaAid Foundation",
  category: "Community & Environment",
  progress: 60,
  applied: 34000,
  total: 50000,
  daysLeft: 12,
  status: "Active",
  img: img, // your image import
}));


const EventList = () => {
   const navigate=useNavigate()



  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-2  sm:flex-row sm:justify-between sm:items-center w-full">
        <div className=" w-full sm:w-[300px]  order-2 sm:order-1">
          <Search />
        </div>
        <div className=' flex justify-end order-1 sm:order-2'>
           <Titlebtn label={'Add New'} url='/app/create-events'  />
        </div>
     
      </div>

    
 <div className="flex flex-col gap-4 w-full">
  {cardsData.map((item,index) => (
     <div
      key={item.id}
      onClick={() => navigate(`/app/events/${item.id}`)}
      className={`
        group
        py-3 px-3 rounded-2xl
        flex flex-col gap-2.5
        md:flex-row md:justify-between md:items-center
        transition-all duration-500 ease-in-out
        hover:shadow-lg hover:shadow-black/10
        cursor-pointer
        ${index  === 0 ? "bg-[#9BD6F6]/30" : "bg-white"}
      `}
    >
      {/* Left Section */}
      <div className="flex flex-row gap-1.5">
        {/* Image */}
        <div className="w-[116px] h-[70px] overflow-hidden rounded-[8px]">
          <img
            src={item.img}
            alt="img"
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-in-out
              group-hover:scale-105
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Mobile Active Badge */}
          <div className="block md:hidden">
            <div
              className="
                w-fit font-medium text-sm
                flex items-center gap-1
                px-3 py-1.5 rounded-full bg-[#E5D5E5]

                transition-all duration-500
                group-hover:bg-[#d6bfd6]
              "
            >
              <DotSvg />
              {item.status}
            </div>
          </div>

          {/* Category */}
          <div className="bg-black/10 w-fit text-xs px-3 py-1 rounded-md hidden md:block">
            {item.category}
          </div>

          {/* Title */}
          <p className="font-medium text-sm transition-colors duration-300 group-hover:text-black">
            {item.title}
          </p>

          {/* Organizer */}
          <div className="flex gap-0.5 text-xs">
            <span className="text-[#94A7B5] font-medium">Organizer:</span>
            <span>{item.organizer}</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col gap-2 md:border-l-[2px] md:border-r-[2px] border-[#A0AEB6] px-3">
        <p className="font-medium text-sm">Apply Member</p>

        {/* Progress Bar */}
        <div className="w-full md:w-[214px] bg-[#B2BCC599] rounded-full h-2 overflow-hidden">
          <div
            className="
              bg-[#9BD6F6] h-2 rounded-full
              transition-all duration-700 ease-in-out
            "
            style={{ width: `${item.progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm">
            <span className="font-medium">{item.applied}</span>
            <span className="text-xs text-black/60 font-medium">
              /{item.total}
            </span>
          </p>

          {/* Mobile Days Left */}
          <div className="block md:hidden flex items-center gap-1.5">
            <FaRegClock />
            <span className="text-sm">{item.daysLeft} days left</span>
          </div>
        </div>
      </div>

      {/* Right Section (Desktop) */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-2">
          {/* Status */}
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
            {item.status}
          </div>

          {/* Days Left */}
          <div className="flex items-center gap-1.5">
            <FaRegClock />
            <span className="text-sm transition-colors duration-300 group-hover:text-black">
              {item.daysLeft} days left
            </span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
        <div className=" flex items-center gap-2 text-xs sm:text-sm text-[#313131]">
        <div>Show</div>
         <div className="w-fit h-[40px] ">
        <PageLimit totalpages={ 10} limit={10} setLimit={4}/>
        </div>
         <div>of 2560 results</div>

        </div>
          
               <TealPagination 
           totalPages={2}
              currentPage={1}
             setCurrentPage={1}
      />
                                      {/* Limit Dropdown */}
      
                          
                                  
                                    
                          
                                    
                                    </div>

    </div>
  );
};

export default EventList;
