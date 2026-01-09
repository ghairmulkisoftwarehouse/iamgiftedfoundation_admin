import Search from '../../../components/global/Search';
import Titlebtn from '../../../components/global/Titlebtn';
import { teamFundrasing } from '../../../constants/dataConstants';
import TealPagination from '../../global/TealPagination';
import PageLimit from '../../global/PageLimit';
import { useNavigate } from 'react-router-dom';

const FundraisingList = () => {
    const navigate=useNavigate();
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search + Add Button */}
      <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="w-full sm:w-[300px] order-2 sm:order-1">
          <Search />
        </div>
        <div className="flex justify-end order-1 sm:order-2">
          <Titlebtn label="Add New"  url = "/app/create-fundraising"  />
        </div>
      </div>

      {/* Fundraising Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {teamFundrasing.map((item, index) => (
          <div
            onClick={()=>navigate(`/app/peer-to-peer-fundraising/${1}`)}
          
            key={index}
            className="group border border-black/20 rounded-[20px] p-3 flex flex-col gap-3 w-full transition-all duration-700 ease-out hover:shadow-2xl
             pb-4
              cursor-pointer
             bg-white
            "
          >
            {/* Image */}
            <div className="w-full h-[236px] overflow-hidden rounded-[20px] ">
              <img
                src={item.image}
                width={370}
                height={236}
                alt={item.title}
                className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 ease-out group-hover:scale-110"
              /> 
            </div>

            {/* Title & Paragraph */}
            <h1 className="font-semibold text-lg md:text-[20px]">{item.title}</h1>
            <p className="text-sm md:text-[15px] text-black/70">{item.paragraph}</p>

            {/* Progress Bar */}
            <div className="flex flex-col gap-1">
              <div className="w-full bg-[#B2BCC599] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-light-cyan h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: '60%' }}
                />
              </div>
              <div className="flex justify-between w-full text-[10px] xs:text-xs md:text-sm font-medium">
                <p className="text-black">Raised: $8,000</p>
                <p className="text-black/70">Goal: $18,000</p>
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
                                  
      
                          
                                  
                                    
                          
                                    
                                    </div>
    </div>
  );
};

export default FundraisingList;
