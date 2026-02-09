// import { useState } from 'react';
import Heading  from '../../../components/global/Heading';
import ImpactTable  from '../../../components/app/impact/ImpactTable';
import Axios from '../../../config/api';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { setImpacts } from '../../../redux/slices/impactSlice';
import devLog from '../../../utils/logsHelper';
// import { getUser } from "../../../utils/authLocalStorage";

const Impact = () => {
 
  //       const user = getUser();
  // console.log(' this isa  user',user.token)

    const dispatch=useDispatch();
     const { impacts } = useSelector(state => state.impact);
   
 devLog(' this is a docs   this is a ',impacts)



    const queryKey = ['fetch-all-impact',];

    const { isLoading, isError, error } = useQuery(
        queryKey,
        () => {
            let url = `/impact`;      
            return Axios.get(url);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const { data: { data: { impacts } } } = data;
                dispatch(setImpacts(impacts));
            },
        }
    );

    return (
     
            <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <ImpactTable

                    isLoading={isLoading} 
               isError={isError}
                error={error}
              />
            
              
            </div>
          
       
    )
}

export default Impact;