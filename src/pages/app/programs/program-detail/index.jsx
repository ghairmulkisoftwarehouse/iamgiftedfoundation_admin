

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
         <div className='  w-full   xl:w-[65%]  flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full '>
          <div className=' xl:col-span-2 w-full'>
              <ProgramCard/>

          </div>
          
            <div className=" block xl:hidden">
            <ProgramChart/>
          </div>
        </div>

         <div className=" block xl:hidden">
                 <ProgramInfo/>
                 </div>
     
         <ProgramTable/>
        
      
        

         </div>
          <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
          <div className="hidden xl:block">
            <ProgramChart/>
          </div>
              
               <div className="hidden xl:block">
                 <ProgramInfo/>
                 </div>


         </div>

         </div>  
             
    
            
              
            </div>
  )
}

export default ProgramDetail