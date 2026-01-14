

import Heading  from '../../../../components/global/Heading';

import ProgramCard   from '../../../../components/app/programdetail/ProgramCard';
import ProgramTable   from '../../../../components/app/programdetail/ProgramTable/ProgramTable';
import ProgramInfo   from '../../../../components/app/programdetail/ProgramInfo';
import ProgramChart   from  '../../../../components/app/programdetail/ProgramChart';
const ProgramDetail = () => {
  return (
    <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>

                   <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full   flex flex-col gap-5'>
       
              <ProgramCard/>

      
     
     
         <ProgramTable/>
        
      
        

         </div>
       

         </div>  
             
    
            
              
            </div>
  )
}

export default ProgramDetail