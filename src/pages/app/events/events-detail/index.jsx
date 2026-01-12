

import Heading  from '../../../../components/global/Heading';

import EventCard   from '../../../../components/app/eventdetail/EventCard';
import EventTable   from '../../../../components/app/eventdetail/EventTable/EventTable';
import EventInfo   from '../../../../components/app/eventdetail/EventInfo';
import EventChart   from  '../../../../components/app/eventdetail/EventChart';
const EventsDetail = () => {
  return (
    <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>

                   <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full   xl:w-[65%]  flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full '>
          <div className=' xl:col-span-2 w-full'>
              <EventCard/>

          </div>
          
            <div className=" block xl:hidden">
            <EventChart/>
          </div>
        </div>

         <div className=" block xl:hidden">
                 <EventInfo/>
                 </div>
     
         <EventTable/>
        
      
        

         </div>
          <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
          <div className="hidden xl:block">
            <EventChart/>
          </div>
              
               <div className="hidden xl:block">
                 <EventInfo/>
                 </div>


         </div>

         </div>  
             
    
            
              
            </div>
  )
}

export default EventsDetail