import Heading  from '../../../../components/global/Heading';
import PostForm  from '../../../../components/app/update-post/PostForm';
import { useParams } from 'react-router-dom';
import Axios from '../../../../config/api';
import { setDocDetails } from '../../../../redux/slices/postSlice';
import { useQuery } from 'react-query';
import devLog from '../../../../utils/logsHelper';
import { useSelector,useDispatch } from 'react-redux';
const UpdatePost = () => {
     const { id } = useParams();
const dispatch = useDispatch();

const { docDetails } = useSelector(state => state.post);



const queryKey = ['fetch-singlePost', id];

    const { isLoading, isError, error } = useQuery(
      queryKey,
      () => {
        const url = `/admin/post/${id}`;
        return Axios.get(url);
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          const {
            data: { data: { doc } },
          } = data;
    
          dispatch(setDocDetails(doc));
        },
      }
    );
  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <PostForm/>
    
            
              
            </div>
  )
}

export default UpdatePost