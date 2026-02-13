import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import TeamsTable  from '../../../components/app/teams/TeamsTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/teamSlice';

const Teams = () => {

   const dispatch=useDispatch();
     const { docs } = useSelector(state => state.team);
   



const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);


    const queryKey = ['fetch-all-team',limit,currentPage];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/team/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
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
              <TeamsTable
            currentPage={currentPage}
         setCurrentPage={setCurrentPage}
            limit={limit}
               setLimit={setLimit}
                    isLoading={isLoading} 
               isError={isError}
                error={error}

              />
         
            
              
            </div>
          
       
    )
}

export default Teams;