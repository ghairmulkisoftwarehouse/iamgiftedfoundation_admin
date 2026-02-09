
import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import CompanyTable  from '../../../components/app/company/CompanyTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/companySlice';
import devLog from '../../../utils/logsHelper';



const Company = () => {

    const dispatch=useDispatch();
    const { docs, } = useSelector(state => state.company);

  devLog(' this is a docs',docs)  

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-company', currentPage,  limit];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/company?pageSize=${limit}&page=${currentPage}&sortBy=createdAt_descending`;      
          
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
              <CompanyTable
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

export default Company;