

import TrashSvg  from '../../../assets/svgs/TrashSvg';
import EditSvg   from '../../../assets/svgs/EditSvg';
import Titlebtn  from '../../global/Titlebtn';
import { useNavigate } from "react-router-dom";
import confirmBox from '../../../utils/confirmBox';
import {useDispatch ,useSelector } from "react-redux";
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../global/DisplayError';
import Loader   from '../../../components/global/Loader'
import moment from 'moment/moment';
import {deleteImpact} from '../../../redux/actions/impactActions';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import DOMPurify from "dompurify";


const ImpactTable = ({
     isLoading,
               isError,
                error,
}) => {
  const navigate = useNavigate();

     const { impacts } = useSelector(state => state.impact);

  const dispatch=useDispatch();
  const queryClient = useQueryClient();





const handleDeleteImpact = async (id) => {
  const title = "Confirm Deletion";
  const message = "Are you sure you want to delete this impact?";

  const onYesClick = async () => {
    await dispatch(deleteImpact(id, toast));
    queryClient.invalidateQueries(["fetch-all-impact"]);
  };

  confirmBox({ title, message, onYesClick });
};



  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Impact</p>
    
                <Titlebtn label="Add New" url="/app/create-impact" />

      </div>

       {isLoading ? (
  <Loader />
) : isError ? (
  <DisplayError message={error?.message || "Something went wrong"} />
) : impacts?.length > 0 ? (
  <div className="overflow-x-auto maintable">
    <table className="min-w-max  mt-5">
      <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
        <tr>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Title</th>
          <th className="px-3 py-4 whitespace-nowrap">Description</th>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Pillar</th>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Program</th>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Support Count</th>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Amount</th>
          <th className="px-3 py-4 whitespace-nowrap overflow-hidden text-ellipsis">Created At</th>
          <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {impacts.map((item) => {
          const formattedDate = item?.createdAt
            ? moment.utc(item.createdAt).format("MMM DD, YYYY")
            : "N/A";

          return (
            <tr key={item?._id}>
              {/* Title – max width 250px */}
              <td className="px-3 py-4  break-words whitespace-normal  max-w-[250px]">
                {item?.title}
              </td>

              {/* Description – max width 250px */}
              <td className="px-3 py-4  break-words whitespace-normal  max-w-[250px]">

               <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.description) }}
     
    />
              </td>

              <td className="px-3 py-4  break-words whitespace-normal  max-w-[250px]">
                {item?.piller?.title }
              </td>

              <td className="px-3 py-4  break-words whitespace-normal  max-w-[250px]">
                {item?.program?.title }
              </td>

              <td className="px-3 py-4 text-center">
                {item?.supportCount ?? 0}
              </td>

              <td className="px-3 py-4 whitespace-nowrap">
                {item?.amount ?? 0} {item?.currencyCode || "USD"}
              </td>

              <td className="px-3 py-4 whitespace-nowrap">
                {formattedDate}
              </td>

              <td className="px-3 py-4">
                <div className="flex gap-1.5 items-center">
                  <div
                    onClick={() =>
                      navigate(`/app/update-impact/${item?._id}`)
                    }
                    className="px-2.5 py-2.5 rounded-lg bg-cyan-Blue cursor-pointer"
                  >
                    <EditSvg />
                  </div>

                  <div
                    onClick={() => handleDeleteImpact(item?._id)}
                    className="px-2.5 py-2.5 rounded-lg bg-darkred cursor-pointer"
                  >
                    <TrashSvg />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
) : (
  <ItemNotFound message="No Impact found." />
)}

      

        {/* <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center w-full px-3  flex-wrap-none">
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
      
                          
                                  
                                    
                          
                                    
                                    </div> */}
    </div>
  );
};

export default ImpactTable;
