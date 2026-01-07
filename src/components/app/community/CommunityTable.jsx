import moment from "moment";
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../global/TealPagination'
import PageLimit   from '../../global/PageLimit'
import  communityImage  from '../../../assets/images/communityImage.png'






const CommunityTable = () => {
const donationTable = [
  {
    id: "#D-321330",
    name: "John Due",
    title: "Sarah Blue",
    description: "Lorem Ipsum is simply dummy text of the printing.",
  },
  {
    id: "#D-321331",
    name: "Michael Smith",
    title: "Emma Green",
    description: "Lorem Ipsum is simply dummy text of the industry.",
  },
  {
    id: "#D-321332",
    name: "David Johnson",
    title: "Olivia Brown",
    description: "Lorem Ipsum has been the industry's standard text.",
  },
  {
    id: "#D-321333",
    name: "Robert Wilson",
    title: "Sophia White",
    description: "Dummy text ever since the 1500s.",
  },
  {
    id: "#D-321334",
    name: "James Anderson",
    title: "Isabella Gray",
    description: "When an unknown printer took a galley.",
  },
  {
    id: "#D-321335",
    name: "William Thomas",
    title: "Mia Black",
    description: "And scrambled it to make a type specimen.",
  },
  {
    id: "#D-321336",
    name: "Daniel Martin",
    title: "Charlotte Pink",
    description: "It has survived not only five centuries.",
  },
  {
    id: "#D-321337",
    name: "Matthew Lee",
    title: "Amelia Purple",
    description: "But also the leap into electronic typesetting.",
  },
  {
    id: "#D-321338",
    name: "Joseph Walker",
    title: "Harper Yellow",
    description: "Remaining essentially unchanged.",
  },
  {
    id: "#D-321339",
    name: "Andrew Hall",
    title: "Evelyn Orange",
    description: "It was popularised in the 1960s.",
  },
];

 

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Community</p>
        

      </div>

      { donationTable.length === 0 ? (
        <p className="text-center py-6 text-gray-400">
          No Recent Community found.
        </p>
      ) : (
         <div className="overflow-x-auto maintable">
          <table className="w-full mt-5  min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
              <tr>
                <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
                     <div className="flex items-center gap-0.5">  
                   ID Number
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                  <div className="flex items-center gap-0.5">  
                   User
               <ArrowTopSvg/>
                </div>
               </th>
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Image
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                 <div className="flex items-center gap-0.5">  
                  Title
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4  rounded-tr-[12px] rounded-br-[12px]">
                 <div className="flex items-center gap-0.5">  
                  Description
               <ArrowTopSvg/>
                </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {donationTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-3 py-4">{row.id}</td>

                  <td className="px-3 py-4  ">
                    <div className="flex items-center gap-2">
                      <div className="w-[32px] h-[32px] overflow-hidden rounded-full">
                                             <img
                                               src={img}
                                               alt="user avatar"
                                               className="w-full h-full object-cover"
                                             />
                                           </div>
                      {row.name}
                    </div>
                  </td>

                  <td className="px-3 py-4">
                     <div className="w-[43px] h-[43px] overflow-hidden rounded-full">
                                             <img
                                               src={communityImage}
                                               alt="user avatar"
                                               className="w-full h-full object-cover"
                                             />
                                           </div>
                  </td>

<td className="px-3 py-4 ">
                    {row.title}
                  </td>
                  <td className="px-3 py-4 break-words  whitespace-normal  max-w-[280px]">
                  <span className="text-black/65">{row.description}</span>
                    
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

export default CommunityTable;
