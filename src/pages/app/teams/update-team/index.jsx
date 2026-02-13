import Heading  from '../../../../components/global/Heading';
import UpdateTeamForm   from '../../../../components/app/update-teams/TeamForm'
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/teamSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
const Updateteam = () => {

     const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.team);


//   const  teadoc=docDetails?.doc

    // devLog(' this is a  docDetails',teadoc)



const queryKey = ['fetch-singleTeam', id];

const { isLoading, isError, error } = useQuery(
  queryKey,
  () => {
    const url = `/team/${id}`;
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
              <UpdateTeamForm/>
    
            
              
            </div>
  )
}

export default Updateteam