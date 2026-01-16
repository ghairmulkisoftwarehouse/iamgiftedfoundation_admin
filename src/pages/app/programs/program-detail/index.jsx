import Heading  from '../../../../components/global/Heading';
import ProgramCard   from '../../../../components/app/programdetail/ProgramCard';
import ProgramTable   from '../../../../components/app/programdetail/ProgramTable/ProgramTable';


import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/programSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
import ItemNotFound from '../../../../components/global/ItemNotFound';
import DisplayError from '../../../../components/global/DisplayError';
import Loader from '../../../../components/global/Loader';


const ProgramDetail = () => {


const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.program);

  devLog(' this is a  docDetails',docDetails?.doc)

  const programdoc=docDetails?.doc



const queryKey = ['fetch-singleProgram', id];

const { isLoading, isError, error } = useQuery(
  queryKey,
  () => {
    const url = `/admin/program/${id}`;
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
         <div className='  w-full   flex flex-col gap-5'>
       
               {isLoading ? (
             <Loader />
           ) : isError ? (
             <DisplayError message={error?.message || "Something went wrong"} />
           ) : programdoc ? (
              <ProgramCard/>
           ) : (
                     <ItemNotFound message="No Program Detail found." />
                   )}
        
      
     
     
         <ProgramTable/>
        
      
        

         </div>
       

         </div>  
             
    
            
              
            </div>
  )
}

export default ProgramDetail