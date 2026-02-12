import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import ImpactTable  from '../../../components/app/impact/ImpactTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/impactSlice';
import devLog from '../../../utils/logsHelper';
// import { getUser } from "../../../utils/authLocalStorage";

const Impact = () => {
 
  //       const user = getUser();
  // console.log(' this isa  user',user.token)

    const dispatch=useDispatch();
     const { docs } = useSelector(state => state.impact);
   
 devLog(' this is a docs   this is a ',docs)


const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);


    const queryKey = ['fetch-all-impact',];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/impact/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
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
              <ImpactTable
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

export default Impact;