


import Heading  from '../../../../components/global/Heading';
import UpdateCategoriesForm   from '../../../../components/app/update-categories/UpdateCategoriesForm';
import Axios from '../../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setDocDetails } from '../../../../redux/slices/categorySlice';
import { useParams } from 'react-router-dom';
const UpdateCategories = () => {

  const dispatch=useDispatch();
    const { docDetails } = useSelector(state => state.category);
  const {id}=useParams();


  // console.log(' this is a docDetails',docDetails)

  const { isLoading, isError, error } = useQuery(
  ['fetch-single-category', id],
  () => Axios.get(`/admin/category/${id}`),
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
              <UpdateCategoriesForm/>
              
            </div>
  )
}

export default UpdateCategories