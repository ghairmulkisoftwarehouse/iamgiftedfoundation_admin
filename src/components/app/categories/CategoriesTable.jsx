
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const CategoriesTable = ( 

    currentPage,
  setCurrentPage,
  limit,
  setLimit,
  isLoading,
  isError,
  error,
) => {

   const { docs, pages ,docsCount } = useSelector(state => state.category);

 const  navigate=useNavigate();





  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Categories</p>
    
                <Titlebtn label="Add New" url="/app/create-categories" />

      </div>

      {isLoading ? (
    <Loader />
  ) : isError ? (
    <DisplayError message={error?.message || "Something went wrong"} />
  ) : docs?.length > 0 ? (
        <div className="overflow-x-auto maintable">
        
          <table className="w-full mt-5 min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
                <th className="px-3 py-4 flex items-center gap-0.5 rounded-tl-[12px] rounded-bl-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>ID</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Image</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Title</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Description</span>
                    <ArrowTopSvg />
                  </div>
                </th>
                <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
                  <div className="flex items-center gap-0.5">
                    <span>Action</span>
                   
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((row, ) => (
                <tr key={docs?._id}>
                  <td className="px-3 py-4">{row?.longAutoIncrementId}</td>

                <td className="px-3 py-4 whitespace-nowrap ">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                        <img
                          src={img}
                          alt="user avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                 
                    </div>
                  </td>
                   <td className="px-3 py-4 whitespace-nowrap">
                        {row?.title}
                  </td>
                   <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65"></span>
                    
                  </td>

                  <td className="px-3 py-4">
                      <div className="flex flex-row gap-1.5 items-center">

                 
                      <div
                            onClick={() => navigate(`/app/update-categories/1`)}
                  
                      className="w-fit px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
                    >
                      <EditSvg/>
                    </div>
                    

                   
                      <div
                       
                        className="w-fit px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
                      >
                        <TrashSvg />
                      </div>
                 
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
              <ItemNotFound message="No Community found." />
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

export default CategoriesTable;
