
import Heading  from '../../../components/global/Heading';
import ProgramsList  from '../../../components/app/programs/ProgramsList';
import ProgramDetail   from '../../../components/app/programs/ProgramDetail';


const Programs = () => {
  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
           
         <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full  xl:w-[70%] '>
      
        <ProgramsList/>
        

         </div>
          <div className='  w-full xl:w-[30%] '>
                 {/* <ProgramDetail/> */}


         </div>

         </div>  
            
              
            </div>
  )
}

export default Programs