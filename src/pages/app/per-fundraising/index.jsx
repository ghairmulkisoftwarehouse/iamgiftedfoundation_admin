
import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import FundraisingList   from '../../../components/app/perfundraising/FundraisingList';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/campaignSlice';
import devLog from '../../../utils/logsHelper';




const PerFundraising = () => {

 const   dispatch=useDispatch();

  
   const { docs } = useSelector(state => state.campaign);
   
 devLog(' this is a docs',docs)



const [keyword, setKeyword] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-campaign', currentPage, keyword, limit];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/admin/campaign/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
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
              <FundraisingList
                 keyword={keyword}
            setKeyword={setKeyword}
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

export default PerFundraising