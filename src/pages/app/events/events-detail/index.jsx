import { useState } from 'react';
import Heading  from '../../../../components/global/Heading';
import EventCard   from '../../../../components/app/eventdetail/EventCard';
import EventTable   from '../../../../components/app/eventdetail/EventTable/EventTable';
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/eventSlice';
  import { setStats as setEventRegistrationStats } 
  from '../../../../redux/slices/eventRegistrationSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
import ItemNotFound from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader from '../../../../components/global/Loader';

const EventsDetail = () => {
const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.event);
    const { docs ,} = useSelector(state => state.eventRegistration);
    
     const [currentPage, setCurrentPage] = useState(1);
        const [limit, setLimit] = useState(10);

  // devLog(' this is a  docDetails',docDetails?.doc)

  const eventdoc=docDetails?.doc



const queryKey = ['fetch-singleEvent', id];

const { isLoading, isError, error } = useQuery(
  queryKey,
  () => {
    // Use template literal to inject the id
    const url = `/admin/event/${id}`;
    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: { data: { doc } },
      } = data;

      dispatch(setDocDetails({ doc }));
    },
  }
);






const eventRegistrationQueryKey = [
  'event-registrations-by-user',
  id,
  currentPage,
  limit,
];


const {
  isLoading: eventLoading,
  isError: eventIsError,
  error: eventError,
} = useQuery(
  eventRegistrationQueryKey,
  () =>
    Axios.get(
      `/event/registrations?eventId=${id}&pageSize=${limit}&page=${currentPage}`
    ),
  {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const { docs, pages, docsCount, page } =
        response.data.data;

      dispatch(
        setEventRegistrationStats({
          docs,
          pages,
          docsCount,
          page,
        })
      );
    },
  }
);


 

  return (
    <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>

              <div className='  w-full  flex flex-col gap-5'>
        
         
               {isLoading ? (
             <Loader />
           ) : isError ? (
             <DisplayError message={error?.message || "Something went wrong"} />
           ) : eventdoc ? (
              <EventCard/>
           ) : (
                     <ItemNotFound message="No Event Detail found." />
                   )}

           

              <EventTable
                   
                    currentPage={currentPage}
            setCurrentPage={setCurrentPage}
                limit={limit}
                  setLimit={setLimit}
               isLoading={eventLoading} 
               isError={eventIsError}
                error={eventError}

              />
        
      
        

         </div>

              
    
            
              
            </div>
  )
}

export default EventsDetail

  //  <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
  //         <div className="hidden xl:block">
  //           <EventChart/>
  //         </div>
              
  //              <div className="hidden xl:block">
  //                <EventInfo/>
  //                </div>


  //        </div>