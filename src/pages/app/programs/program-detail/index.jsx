import { useState } from 'react';
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
import Titlebtn from '../../../../components/global/Titlebtn';
  import { setStats as setEventRegistrationStats } 
  from '../../../../redux/slices/eventRegistrationSlice';


const ProgramDetail = () => {


const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.program);
    const { docs , pages ,docsCount } = useSelector(state => state.eventRegistration); 
    // console.log('docs  this is a progrm ',docs)  

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);


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




const eventRegistrationQueryKey = [
  'prgram-registrations-by-user',
  id,
  currentPage,
  limit,
];


const {
  isLoading: programLoading,
  isError: programIsError,
  error: programError,
} = useQuery(
  eventRegistrationQueryKey,
  () =>
    Axios.get(
      `/event/registrations?program=${id}&pageSize=${limit}&page=${currentPage}`
    ),
  {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const { docs, pages, docsCount, page } =
        response.data.data;

      dispatch(
        setEventRegistrationStats({
          docs,
          pages,
          docsCount,
          page,
        })
      );
    },
  }
);
  


  return (
    <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>

                   <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full   flex flex-col gap-5'>
       <div className=' flex justify-end'>
       <Titlebtn   width="w-[200px]"  label={'Update Program'} url={`/app/update-programs/${id}`}/>

       </div>
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