import Heading  from '../../../../components/global/Heading';
import FundraisingCard   from '../../../../components/app/fundraisnigdetail/FundraisingCard';
import FundraisingTable   from '../../../../components/app/fundraisnigdetail/fundraisingTable/FundraisingTable';
import FundraisingInfo   from '../../../../components/app/fundraisnigdetail/FundraisingInfo';
import FundraisingChart   from  '../../../../components/app/fundraisnigdetail/FundraisingChart';
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/campaignSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
import ItemNotFound from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader from '../../../../components/global/Loader';
const FundraisnigDetail = () => {

 const {id}=useParams();

const dispatch=useDispatch();

const { docDetails } = useSelector(state => state.campaign);

  devLog(' this is a  docDetails',docDetails?.doc)

  const campaigndoc=docDetails?.doc



const queryKey = ['fetch-singlecampaign', id];

const { isLoading, isError, error } = useQuery(
  queryKey,
  () => {
    
    const url = `/admin/campaign/${id}`;
    return Axios.get(url);
  },
  {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const {
        data: { data: { doc } },
      } = data;

      dispatch(setDocDetails({ doc }));
    },
  }
);







  return (
      <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
           
         <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full   xl:w-[65%]  flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full '>
          <div className=' xl:col-span-2 w-full'>

             {isLoading ? (
                       <Loader />
                     ) : isError ? (
                       <DisplayError message={error?.message || "Something went wrong"} />
                     ) : campaigndoc ? (
                        <FundraisingCard/>
                     ) : (
                          <ItemNotFound message="No P2P  Detail found." />
                             )}
            

          </div>
          
            <div className=" block xl:hidden">
            <FundraisingChart/>
          </div>
        </div>

         <div className=" block xl:hidden">
                 <FundraisingInfo/>
                 </div>
     
         <FundraisingTable/>
        
      
        

         </div>
          <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
          <div className="hidden xl:block">
            <FundraisingChart/>
          </div>
              
               <div className="hidden xl:block">
                 <FundraisingInfo/>
                 </div>


         </div>

         </div>  
            
              
      </div>
  )
}

export default FundraisnigDetail;