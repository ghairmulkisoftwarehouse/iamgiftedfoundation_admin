import Heading  from '../../../../components/global/Heading';
import PillerForm   from '../../../../components/app/update-piller/PillerForm'
import Axios from '../../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setDocDetails } from '../../../../redux/slices/pillarSlice';
import { useParams } from 'react-router-dom';
const UpdatePillers = () => {


      const dispatch=useDispatch();
    const { docDetails } = useSelector(state => state.piller);
  const {id}=useParams();


  // console.log(' this is a docDetails',docDetails)

  const { isLoading, isError, error } = useQuery(
  ['fetch-single-piller', id],
  () => Axios.get(`/piller/${id}`),
  {
    enabled: !!id, 
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      const {
        data: {
          data: { doc },
        },
      } = res;

      dispatch(setDocDetails(doc));
    },
  }
);


  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
               <PillerForm/>
            
              
            </div>
  )
}

export default UpdatePillers