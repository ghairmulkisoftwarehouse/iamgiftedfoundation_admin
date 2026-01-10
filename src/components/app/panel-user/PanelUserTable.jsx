
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit';
import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EyetSVG from "../../../assets/svgs/EyetSVG";
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';

const PanelUserTable = () => {
const tableData = [
  {
    idCode: "#D-321330",
    user: "John Due",
    phoneNumber: "+92 039827131",
    email: "john@gmail.com",
    createDate: "31-12-2025",
    typeAccess: "Super Admin",
    status: "Active",
  },
  {
    idCode: "#D-321331",
    user: "Jane Smith",
    phoneNumber: "+92 301234567",
    email: "jane@gmail.com",
    createDate: "30-12-2025",
    typeAccess: "Admin",
    status: "Block",
  },
  {
    idCode: "#D-321332",
    user: "Michael Lee",
    phoneNumber: "+92 312987654",
    email: "michael@gmail.com",
    createDate: "29-12-2025",
    typeAccess: "Admin",
    status: "Active",
  },
  {
    idCode: "#D-321333",
    user: "Sarah Khan",
    phoneNumber: "+92 334567890",
    email: "sarah@gmail.com",
    createDate: "28-12-2025",
    typeAccess: "Admin",
    status: "Active",
  },
  {
    idCode: "#D-321334",
    user: "Ali Raza",
    phoneNumber: "+92 345678901",
    email: "ali@gmail.com",
    createDate: "27-12-2025",
    typeAccess: "Admin",
    status: "Block",
  },
];



  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Panel User</p>
    
                <Titlebtn label="Add New" url="/app/create-new-user" />

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
                    <span>User Name</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Email</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Phone Number</span>
                    <ArrowTopSvg />
                  </div>
                </th>

                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Create Date</span>
                    <ArrowTopSvg />
                  </div>
                </th>
                  <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Type Access</span>
                    <ArrowTopSvg />
                  </div>
                </th>
                  <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">
                    <span>Status</span>
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
                      {row.user}
                    </div>
                  </td>


                         <td className="px-3 py-4 whitespace-nowrap">
                       {row.email}
                  </td>
                  <td className="px-3 py-4  whitespace-nowrap ">
                                             {row.phoneNumber}

                  </td>

               

                  <td className="px-3 py-4">
                      {row.createDate}
                  </td>
                      <td className="px-3 py-4  ">
                      <div className=" bg-[#EDF1F3] px-2 py-2 flex justify-center  rounded-[4px]">
                         {row.typeAccess}

                      </div>
                        
                  </td>

                 <td className="px-3 py-4  ">
                     <Status  status={row.status}  />   
                  </td>



                  <td className="px-3 py-4">
                      <div className="flex flex-row gap-1.5 items-center">

                 
                      <div
                    
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

export default PanelUserTable;
