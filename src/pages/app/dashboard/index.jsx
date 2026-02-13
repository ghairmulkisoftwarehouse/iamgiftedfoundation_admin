import { useState } from 'react';
import DashboardCard   from '../../../components/app/dashboard/DashboardCard';
import DashboardChart   from '../../../components/app/dashboard/Dashboardchart/DashboardChart';
import DashboardTable   from '../../../components/app/dashboard/DashboardTable'
import Heading  from '../../../components/global/Heading';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats } from '../../../redux/slices/donationSlice';
import ItemNotFound   from '../../../components/global/ItemNotFound';
import DisplayError from '../../../components/global/DisplayError';
import Loader   from '../../../components/global/Loader'


const Dashboard = () => {



 const dispatch=useDispatch();
    const { docs, } = useSelector(state => state.donation);
   console.log('   this is  a conole  docs',docs)
//   devLog(' this is a docs',docs)  

const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);

    const queryKey = ['fetch-all-donation', currentPage,  limit];

    const {   isLoading: isLoadingDonation,
  isError: isErrorDonation,
  error: errorDonation, } = useQuery(
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
               <DashboardCard/>
               <DashboardChart/>

                               {isLoadingDonation ? (
                                 <Loader />
                               ) : isErrorDonation ? (
                                 <DisplayError message={errorDonation?.message || "Something went wrong"} />
                               ) : docs?.length > 0 ? (
                                 <DashboardTable />
                               ) : (
                                 <ItemNotFound message="No Donation found." />
                               )}
             
              
            </div>
          
       
    )
}

export default Dashboard