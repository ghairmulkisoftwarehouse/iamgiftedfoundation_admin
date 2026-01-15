
import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import ProgramsList  from '../../../components/app/programs/ProgramsList';
import ProgramDetail   from '../../../components/app/programs/ProgramDetail';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/eventSlice';
import devLog from '../../../utils/logsHelper';


const Programs = () => {

   const dispatch=useDispatch();
  const { docs } = useSelector(state => state.program);
 devLog(' this is a docs',docs)


const [keyword, setKeyword] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-program', currentPage, keyword, limit];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/admin/program/?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
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
         <div className='  w-full  xl:w-[70%] '>
      
        <ProgramsList
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
          <div className='  w-full xl:w-[30%] '>
                 <ProgramDetail/>


         </div>

         </div>  
            
              
            </div>
  )
}

export default Programs