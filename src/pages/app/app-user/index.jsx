
import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import AppUserTable  from '../../../components/app/app-user/AppUserTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/appUserSlice';
import devLog from '../../../utils/logsHelper';
const AppUser = () => {

 const  dispatch=useDispatch();

  const { docs, } = useSelector(state => state.appUser);
    const [selectRole, setSelectRole] = useState("");
    devLog(' this is a  selectRole',selectRole)

  devLog(' this is a docs',docs)  

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

  const queryKey = ['fetch-all-user', currentPage,  limit,selectRole];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/user/?pageSize=${limit}&page=${currentPage}`;      
           
    if (selectRole) {
      url += `&role=${selectRole.toLowerCase()}`;
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
              <AppUserTable
                 currentPage={currentPage}
            setCurrentPage={setCurrentPage}
                limit={limit}
                  setLimit={setLimit}
               isLoading={isLoading} 
               isError={isError}
                error={error}
                setSelectRole={setSelectRole}

              />
              
            </div>
          
       
    )
}

export default AppUser;