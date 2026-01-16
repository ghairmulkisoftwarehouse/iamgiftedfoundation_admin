import { useNavigate } from 'react-router-dom';
import Search from '../../../components/global/Search';
import Titlebtn from '../../../components/global/Titlebtn';
import img from '../../../assets/images/programimg.png';
import DotSvg from '../../../assets/svgs/DotSvg';
import { FaRegClock } from 'react-icons/fa';
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import { useSelector } from 'react-redux';
import devLog from '../../../utils/logsHelper';
import { baseURL } from '../../../config/api';





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


const ProgramsList = ({
  keyword,
  setKeyword,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,detail
}) => {

  const navigate=useNavigate();

   const { docs , pages ,docsCount, } = useSelector(state => state.program);
   
 devLog(' this is a docs',docs)

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-2  sm:flex-row sm:justify-between sm:items-center w-full">
        <div className=" w-full sm:w-[300px]  order-2 sm:order-1">
         <Search  keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div className=' flex justify-end order-1 sm:order-2'>
           <Titlebtn label={'Add New'} url='/app/create-programs'  />
        </div>
     
      </div>

    
  <div className="flex flex-col gap-4 w-full">
  {isLoading ? (
    <Loader />
  ) : isError ? (
    <DisplayError message={error} />
  ) : docs && docs.length > 0 ? (
    docs.map((item, index) => {
      // Calculate days left
 

      const progress = Math.min(
        Math.round((item.appliedMembers?.length || 0 / (item.totalMembers || 1)) * 100),
        100
      );

      return (
        <div
          key={item._id}
          onClick={() => navigate(`/app/Programs/${item._id}`)}
          className={`
            group py-3 px-3 rounded-2xl
            flex flex-col gap-2.5
            md:flex-row md:justify-between md:items-center
            transition-all duration-500
            hover:shadow-lg hover:shadow-black/10
            cursor-pointer
             ${
          index === 0
            ? detail
              ? 'bg-white'
              : 'bg-[#9BD6F6]/30'
            : 'bg-white'
        }
          `}
        >
          {/* Left */}
          <div className="flex gap-1.5">
            <div className="w-[116px] h-[70px] overflow-hidden rounded-[8px]">
             <img
              src={item.featuredImage?.relativeAddress ? `${baseURL}/${item?.featuredImage?.relativeAddress}` : img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />

            </div>

            <div className="flex flex-col gap-1.5">
              <div className="block md:hidden">
                <span className="flex  w-fit items-center gap-1 px-3 py-1.5 rounded-full bg-[#E5D5E5] text-sm">
                  <DotSvg />
                  Active
                </span>
              </div>
                 {
                  item.category  &&(
                    <div className="bg-black/10 w-fit text-xs px-3 py-1 rounded-md hidden md:block">
                {item.category.title}
              </div>
                  )
                 }
            
               <div className='  md:max-w-[200px] '>
                 <p className="font-medium text-[13px] sm:text-sm">{item.title}</p>
               </div>
            

              <div className="text-xs flex gap-1">
                <span className="text-[#94A7B5]">Organizer:</span>
                <span>{item.hostedBy?.title || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className="flex flex-col gap-2  md:border-l border-black/40   md:border-r  px-3">
            <p className="font-medium text-sm">Apply Member</p>

            <div className="w-full md:w-[214px] bg-[#B2BCC599] rounded-full h-2">
              <div
                className="bg-[#9BD6F6] h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm">
                <span className="font-medium">{item.appliedMembers?.length || 0}</span>
                <span className="text-xs text-black/60">/{item.totalMembers || 100}</span>
              </p>

              <div className="block md:hidden flex items-center gap-1">
                <FaRegClock />
                <p className="text-sm md:text-sm">12 <span className=' font-medium   text-black/80'> days left</span></p>   
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex flex-col gap-2">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E5D5E5] text-sm">
              <DotSvg />
              Active
            </span>

            <div className="flex items-center gap-1">
              <FaRegClock />
          <p className=" text-sm md:text-sm">12 <span className=' font-medium   text-black/50'> days left</span></p>   

            </div>
          </div>
        </div>
      );
    })
  ) : (
    <ItemNotFound message="No events found." />
  )}
</div>


 
  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
        <div className=" flex items-center gap-2 text-xs sm:text-sm text-[#313131]">
        <div>Show</div>
         <div className="w-fit h-[40px] ">
        <PageLimit totalpages={docsCount || 10} limit={limit} setLimit={setLimit}/>
        </div>
         <div>of {docsCount} results</div>

        </div>
          
               <TealPagination 
             totalPages={pages}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
      />
                                      {/* Limit Dropdown */}
      
                          
                                  
                                    
                          
                                    
                                    </div>

    </div>
  );
};

export default ProgramsList;
