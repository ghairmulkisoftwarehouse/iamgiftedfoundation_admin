import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import Titlebtn  from '../../global/Titlebtn';
import TeamForm  from '../create-team/TeamForm'
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import {useSelector } from "react-redux";
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader from "../../global/Loader";
import { baseURL } from "../../../config/api";




const TeamsTable = ({
     currentPage,
         setCurrentPage,
            limit,
               setLimit,
     isLoading,
               isError,
                error,
}) => {
// const dataTable = [
//   {
//     id: "#D-321330",
//     name: "John Due",
//     title: "Sarah Blue",
//     designation: "Social Media Manager",
//     description: "Lorem Ipsum is simply dummy text of the printing.",
//   },
//   {
//     id: "#D-321331",
//     name: "Michael Smith",
//     title: "Emma Green",
//     designation: "Marketing Executive",
//     description: "Lorem Ipsum is simply dummy text of the industry.",
//   },
//   {
//     id: "#D-321332",
//     name: "David Johnson",
//     title: "Olivia Brown",
//     designation: "Project Manager",
//     description: "Lorem Ipsum has been the industry's standard text.",
//   },
//   {
//     id: "#D-321333",
//     name: "Robert Wilson",
//     title: "Sophia White",
//     designation: "UI/UX Designer",
//     description: "Dummy text ever since the 1500s.",
//   },
//   {
//     id: "#D-321334",
//     name: "James Anderson",
//     title: "Isabella Gray",
//     designation: "Software Engineer",
//     description: "When an unknown printer took a galley.",
//   },
//   {
//     id: "#D-321335",
//     name: "William Thomas",
//     title: "Mia Black",
//     designation: "Business Analyst",
//     description: "And scrambled it to make a type specimen.",
//   },
//   {
//     id: "#D-321336",
//     name: "Daniel Martin",
//     title: "Charlotte Pink",
//     designation: "Content Strategist",
//     description: "It has survived not only five centuries.",
//   },
//   {
//     id: "#D-321337",
//     name: "Matthew Lee",
//     title: "Amelia Purple",
//     designation: "SEO Specialist",
//     description: "But also the leap into electronic typesetting.",
//   },
//   {
//     id: "#D-321338",
//     name: "Joseph Walker",
//     title: "Harper Yellow",
//     designation: "Product Owner",
//     description: "Remaining essentially unchanged.",
//   },
//   {
//     id: "#D-321339",
//     name: "Andrew Hall",
//     title: "Evelyn Orange",
//     designation: "Operations Manager",
//     description: "It was popularised in the 1960s.",
//   },
// ];

    const { docs , pages ,docsCount, }= useSelector(state => state.team);

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Teams</p>
      <Titlebtn label="Add New" url="/app/create-team/1" />
        

      </div>

      {isLoading ? (
       <Loader />
     ) : isError ? (
       <DisplayError message={error?.message || "Something went wrong"} />
     ) : docs?.length > 0 ? (
         <div className="overflow-x-auto maintable">
          <table className="w-full mt-5  min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
               
                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">  
                   User
                </div>
               </th>
               
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Title
                </div>
                 
                </th>
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
               Designation
                </div>
                </th>
                <th className="px-3 py-4  rounded-tr-[12px] rounded-br-[12px]">
                 <div className="flex items-center gap-0.5">  
                  Description
                </div>
                </th>
                  <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
            Action
          </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((row, ) => (
                <tr key={row?._id} className="border-t">
                  {/* <td className="px-3 py-4">{row.id}</td> */}

                  <td className="px-3 py-4  ">
                    <div className="flex items-center gap-2">

                       <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                                            <img
                                                src={
                                                            row?.image?.relativeAddress
                                                                 ? `${baseURL}/${row?.image?.relativeAddress}`
                                                            : img
                                                         }
                                              alt="user avatar"
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                     
                    </div>
                  </td>

                  <td className="px-3 py-4">
                  {row?.title}
                  </td>

<td className="px-3 py-4 ">
                  {row?.designation}

                  </td>
                  <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65">
                                      {row?.description}

                  </span>
                    
                  </td>

                    <td className="px-3 py-4">
                                  <div className="flex gap-1.5 items-center">
                                    <div
                                     
                                      className="px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
                                    >
                                      <EditSvg />
                                    </div>
                  
                                    <div
                                      className="px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
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
       <ItemNotFound message="No Impact found." />
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

export default TeamsTable;
