import { useState } from "react";
import Heading from "../../../components/global/Heading"
import PostTable  from '../../../components/app/post/PostTable';
import Axios from '../../../config/api';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/postSlice';
const Post = () => {
   const   dispatch=useDispatch();


    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    
        const queryKey = ['fetch-all-post', currentPage, limit];
    
        const { isLoading, isError, error } = useQuery(
            queryKey,
            () => {
                let url = `/admin/post/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
              
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
              <PostTable
                  tPage={setCurrentPage}
            limit={limit}
               setLimit={setLimit}
               isLoading={isLoading} 
               isError={isError}
                error={error}

              />
            
           
    
            
              
            </div>
  )
}

export default Post