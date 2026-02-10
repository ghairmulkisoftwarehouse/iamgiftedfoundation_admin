
import { useState } from 'react';
import Heading  from '../../../../components/global/Heading';
import Axios from '../../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setDocDetails } from '../../../../redux/slices/companySlice';
// import devLog from '../../../../utils/logsHelper';
import UpdateCompanyForm   from '../../../../components/app/update-company/CompanyForm'
import { useParams } from 'react-router-dom';


const UpdateCompany = () => {


    const dispatch=useDispatch();
    const { docDetails } = useSelector(state => state.company);
  const {id}=useParams();


  const { isLoading, isError, error } = useQuery(
  ['fetch-single-company', id],
  () => Axios.get(`/company/${id}`),
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
              <UpdateCompanyForm/>
           
              
            </div>
               
    )
}

export default UpdateCompany;