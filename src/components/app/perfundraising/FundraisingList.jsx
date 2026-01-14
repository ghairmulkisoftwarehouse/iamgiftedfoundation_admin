import Search from '../../../components/global/Search';
import Titlebtn from '../../../components/global/Titlebtn';
import TealPagination from '../../global/TealPagination';
import PageLimit from '../../global/PageLimit';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import img from '../../../assets/images/img1.jpg'
import { baseURL } from '../../../config/api';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import DOMPurify from "dompurify";

const FundraisingList = ({
  keyword,
  setKeyword,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
}) => {
    const navigate=useNavigate();
    const  dispatch=useDispatch();
       const { docs , pages ,docsCount, } = useSelector(state => state.campaign);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search + Add Button */}
      <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="w-full sm:w-[300px] order-2 sm:order-1">
          <Search  keyword={keyword} setKeyword={setKeyword}  />
        </div>
        <div className="flex justify-end order-1 sm:order-2">
          <Titlebtn label="Add New"  url = "/app/create-fundraising"  />
        </div>
      </div>

      {/* Fundraising Cards */}

      {isLoading ? (
  <Loader />
) : isError ? (
  <DisplayError message={error?.message || "Something went wrong"} />
) : docs?.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
    {docs.map((item) => {
      const imageUrl = item?.featuredImage?.relativeAddress
        ? `${baseURL}/${item.featuredImage.relativeAddress}`
        : img;

      const progress =
        item?.goalAmount > 0
          ? Math.min((item.raisedAmount / item.goalAmount) * 100, 100)
          : 0;

      return (
        <div
          key={item._id}
          onClick={() =>
            navigate(`/app/peer-to-peer-fundraising/${item._id}`)
          }
          className="group border border-black/20 rounded-[20px] p-3 flex flex-col gap-3 w-full transition-all duration-700 ease-out hover:shadow-2xl
          pb-4 cursor-pointer bg-white"
        >
          {/* Image */}
          <div className="w-full h-[236px] overflow-hidden rounded-[20px]">
            <img
              src={imageUrl}
              alt={item?.title || "Fundraising"}
              className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>

          {/* Title */}
          <h1 className="font-semibold text-lg md:text-[20px]">
            {item.title}
          </h1>

          {/* Description */}

            <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.body) }}
      className="text-sm md:text-[15px] text-black/70 line-clamp-3"
    />
      

          {/* Progress */}
          <div className="flex flex-col gap-1">
            <div className="w-full bg-[#B2BCC599] rounded-full h-2 overflow-hidden">
              <div
                className="bg-light-cyan h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] xs:text-xs md:text-sm font-medium">
              <p className="text-black">
                Raised: {item.currencyCode}{" "}
                {item.raisedAmount?.toLocaleString()}
              </p>
              <p className="text-black/70">
                Goal: {item.currencyCode}{" "}
                {item.goalAmount?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <ItemNotFound message="No fundraising found." />
)}


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

export default FundraisingList;
