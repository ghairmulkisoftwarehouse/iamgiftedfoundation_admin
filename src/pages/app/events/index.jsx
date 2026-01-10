


import Heading  from '../../../components/global/Heading';
import EventList  from '../../../components/app/events/EventList';
const Events = () => {
  return (
       <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
           
         <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full  xl:w-[70%] '>
      
            <EventList/>

         </div>
          <div className='  w-full xl:w-[30%] '>
                 {/* <ProgramDetail/> */}


         </div>

         </div>  
            
              
            </div>
  )
}

export default Events