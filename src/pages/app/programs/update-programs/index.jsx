


import Heading  from '../../../../components/global/Heading';
import ProgramsForm   from '../../../../components/app/update-program/ProgramsForm'
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/programSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
const UpdatePrograms = () => {


    const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.program);

//   devLog(' this is a  docDetails',docDetails?.doc)

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
              <ProgramsForm  programdoc={programdoc}/>
          
              
    
            
              
            </div>
  )
}

export default UpdatePrograms