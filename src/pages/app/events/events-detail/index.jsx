

import Heading  from '../../../../components/global/Heading';

import EventCard   from '../../../../components/app/eventdetail/EventCard';
import EventTable   from '../../../../components/app/eventdetail/EventTable/EventTable';
// import EventInfo   from '../../../../components/app/eventdetail/EventInfo';
// import EventChart   from  '../../../../components/app/eventdetail/EventChart';
const EventsDetail = () => {
  return (
    <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>

              <div className='  w-full  flex flex-col gap-5'>
        
         
              <EventCard/>
              <EventTable/>
        
      
        

         </div>

              
    
            
              
            </div>
  )
}

export default EventsDetail

  //  <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
  //         <div className="hidden xl:block">
  //           <EventChart/>
  //         </div>
              
  //              <div className="hidden xl:block">
  //                <EventInfo/>
  //                </div>


  //        </div>