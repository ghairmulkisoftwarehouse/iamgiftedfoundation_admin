
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';
import { useNavigate } from "react-router-dom";


const CategoriesTable = () => {


 const  navigate=useNavigate();

const tableData = [
  {
    idCode: "#D-321330",
    title: "Sarah Blue",
    description: "Lorem Ipsum is simply dummy text of the printing"
  },
  {
    idCode: "#D-321331",
    title: "John Smith",
    description: "Lorem Ipsum is simply dummy text of the industry"
  },
  {
    idCode: "#D-321332",
    title: "Emma Johnson",
    description: "Lorem Ipsum has been the industry's standard"
  },
  {
    idCode: "#D-321333",
    title: "Michael Brown",
    description: "Dummy text ever since the 1500s"
  },
  {
    idCode: "#D-321334",
    title: "Olivia Wilson",
    description: "When an unknown printer took a galley"
  },
  {
    idCode: "#D-321335",
    title: "David Miller",
    description: "Of type and scrambled it to make"
  },
  {
    idCode: "#D-321336",
    title: "Sophia Taylor",
    description: "A type specimen book for testing"
  },
  {
    idCode: "#D-321337",
    title: "Daniel Anderson",
    description: "It has survived not only five centuries"
  },
  {
    idCode: "#D-321338",
    title: "Isabella Thomas",
    description: "But also the leap into electronic typesetting"
  }
];




  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Categories</p>
    
                <Titlebtn label="Add New" url="/app/create-categories" />

      </div>

      {tableData.length === 0 ? (
        <p className="text-center py-6 text-gray-400">
          No Recent App User found.
        </p>
      ) : (
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
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="px-3 py-4">{row.idCode}</td>

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
                        {row.title}
                  </td>
                   <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65">{row.description}</span>
                    
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
      )}

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

export default CategoriesTable;
