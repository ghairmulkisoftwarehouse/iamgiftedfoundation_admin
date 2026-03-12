import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import PanelUserTable  from '../../../components/app/panel-user/PanelUserTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/panelUserSlice';
import devLog from '../../../utils/logsHelper';

const PanelUser = () => {
     const dispatch=useDispatch();
     const { docs } = useSelector(state => state.panelUser);
   
//  devLog(' this is a docs   this is a ',docs)


const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);


    const queryKey = ['fetch-all-Panel-user',];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/admin/admin-user?pageSize=${limit}&page=${currentPage}`;      
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
              <PanelUserTable
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

export default PanelUser;