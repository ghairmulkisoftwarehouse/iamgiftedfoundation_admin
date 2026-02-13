import moment from "moment";
import ArrowTopSvg from "../../../assets/svgs/ArrowTopSvg";
import img from "../../../assets/images/img1.jpg";
import Status from "../../global/Status";
import TealPagination   from '../../../components/global/TealPagination'
import PageLimit   from '../../../components/global/PageLimit';
import { useSelector } from "react-redux";
import formatLabel   from '../../../utils/formatLabel'

const DashboardTable = () => {
  const { docs , } = useSelector(state => state.donation);   


  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between w-full px-3 pt-2">
        <p className="text-black font-semibold">Donations</p>
      </div>

       <div className="overflow-x-auto maintable">
              <table className="w-full mt-5  min-w-max md:min-w-full">
              <thead className="text-left text-[13px] sm:text-sm md:text-[15px]">
      <tr>
    
       <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Donor
          </div>
        </th>
          {/* <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Phone
          </div>
        </th> */}
          <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Email
          </div>
        </th>
        <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
          <div className="flex items-center gap-1">
                  Date & Time
          </div>
        </th>   
    
    
       <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Target Type
          </div>
        </th>
           <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Donation Type
          </div>
        </th>
    
        <th className="px-3 py-4">
          <div className="flex items-center gap-1">
            Amount
          </div>
        </th>
        <th className="px-3 py-4 rounded-tr-[12px] rounded-br-[12px]">
          Status
        </th>
      </tr>
    </thead>
    
    
              <tbody>
            {docs.map((item) => {
              const formattedDate = item?.createdAt
                ? moment(item.createdAt).format("MMM DD, YYYY hh:mm A")
                : "N/A";
    
              return (
                <tr key={item?._id} className="border-t">
                  <td className="px-3 py-4">
                    {item?.donorUser?.username || "Anonymous"}
                  </td>
    
                  {/* <td className="px-3 py-4">
                    {item?.phone || "N/A"}
                  </td> */}
                    <td className="px-3 py-4">
                    {item?.donorUser?.email || "N/A"}
                  </td>
                  <td className="px-3 py-4">
                    {formattedDate}
                  </td>
    
        
                  
    
                  <td className="px-3 py-4">
                  
                    
                  {formatLabel(item?.targetType || "N/A")}
                  </td>
    
                  <td className="px-3 py-4">
    
                  {formatLabel(item?.donationType || "N/A")}
                  
                  </td>
    
                  <td className="px-3 py-4">
                    {item?.amount ?? 0}
                  </td>
    
                  <td className="px-3 py-4">
                    <Status status={item?.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
              </table>
            </div>
    </div>
  );
};

export default DashboardTable;
