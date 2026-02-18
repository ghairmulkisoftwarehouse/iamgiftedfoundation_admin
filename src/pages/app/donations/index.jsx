
import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import DonationsTable   from '../../../components/app/donations/DonationsTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/donationSlice';
import devLog from '../../../utils/logsHelper';


const Donations = () => {

 const dispatch=useDispatch();
    const { docs, } = useSelector(state => state.donation);

//   devLog(' this is a docs',docs)  

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-donation', currentPage,  limit];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/donation?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
          
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
              <DonationsTable

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

export default Donations;