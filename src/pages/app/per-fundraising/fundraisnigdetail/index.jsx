import Heading  from '../../../../components/global/Heading';
import FundraisingCard   from '../../../../components/app/fundraisnigdetail/FundraisingCard';
import FundraisingTable   from '../../../../components/app/fundraisnigdetail/fundraisingTable/FundraisingTable';
import FundraisingInfo   from '../../../../components/app/fundraisnigdetail/FundraisingInfo';
import FundraisingChart   from  '../../../../components/app/fundraisnigdetail/FundraisingChart';
const FundraisnigDetail = () => {
  return (
      <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
           
         <div className=' w-full  flex flex-col xl:flex-row gap-4'>
         <div className='  w-full   xl:w-[65%]  flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full '>
          <div className=' xl:col-span-2 w-full'>
              <FundraisingCard/>

          </div>
          
            <div className=" block xl:hidden">
            <FundraisingChart/>
          </div>
        </div>

         <div className=" block xl:hidden">
                 <FundraisingInfo/>
                 </div>
     
         <FundraisingTable/>
        
      
        

         </div>
          <div className='  w-full  xl:w-[35%]  flex flex-col gap-5'>
          <div className="hidden xl:block">
            <FundraisingChart/>
          </div>
              
               <div className="hidden xl:block">
                 <FundraisingInfo/>
                 </div>


         </div>

         </div>  
            
              
      </div>
  )
}

export default FundraisnigDetail;