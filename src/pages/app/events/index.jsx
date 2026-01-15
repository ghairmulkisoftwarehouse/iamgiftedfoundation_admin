

import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import EventList  from '../../../components/app/events/EventList';
import EventDetail from '../../../components/app/events/EventDetail';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/eventSlice';
import devLog from '../../../utils/logsHelper';
import Loader from '../../../components/global/Loader';
import DisplayError from '../../../components/global/DisplayError';




const Events = () => {

 const   dispatch=useDispatch();

  const  [detail,setDetail]=useState('');

   const { docs, } = useSelector(state => state.event);
   
 devLog(' this is a docs',docs)
 const eventDoc=docs[0];



const [keyword, setKeyword] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-event', currentPage, keyword, limit];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/admin/event/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
            if (keyword) {
                url += `&keyword=${encodeURIComponent(keyword)}`;
            }
            return Axios.get(url);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const { data: { data: { docs, pages, docsCount, page } } } = data;
                dispatch(setStats({ docs, pages, docsCount, page }));
            },
        }
    );









  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
           
         <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div           className={`
            w-full
            ${detail ? 'xl:w-full' : 'xl:w-[70%]'}
            transition-all duration-300
          `}>
      
            <EventList
         keyword={keyword}
         setKeyword={setKeyword}
         currentPage={currentPage}
         setCurrentPage={setCurrentPage}
            limit={limit}
               setLimit={setLimit}
               isLoading={isLoading} 
               isError={isError}
                error={error}
                detail={detail}

            />

         </div>
              {!detail && (
        <div className="w-full xl:w-[30%]">
            {isLoading  ? (
                <Loader />
            ) : isError ? (
                <DisplayError message={error?.message || 'Failed to load event'} />
            ) : eventDoc ? (
                <EventDetail     eventDetail={eventDoc}   setDetail={setDetail}/>
            ) : (
                <div className="w-full h-full flex justify-center items-center py-6 text-gray-500 bg-white rounded-[15px]">
                No Data Available
                </div>
            )}
</div>
              )}

         </div>  
            
              
            </div>
  )
}

export default Events