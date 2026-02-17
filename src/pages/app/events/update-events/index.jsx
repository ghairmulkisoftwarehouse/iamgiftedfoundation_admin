


import Heading  from '../../../../components/global/Heading';
import EventsForm from '../../../../components/app/update-events/UpdateEventsForm'
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/eventSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useQuery } from 'react-query';



const UpdateEvents = () => {



    const { id } = useParams();
    const dispatch = useDispatch();
    
 


    
    
    
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
    
  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <EventsForm/>
             
              
    
            
              
            </div>
  )
}

export default UpdateEvents