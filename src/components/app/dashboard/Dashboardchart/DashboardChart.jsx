
import BookedChart  from './charts/BookedChart';

import DoughnutChart  from './charts/DoughnutChart';


const DashboardChart = () => {



  return (
    <div className="  w-full flex  flex-col md:flex-row gap-3">

    <div className=" w-full w-full md:w-[50%] lg:w-[60%]  bg-white  rounded-[18px] h-fit py-7 px-4">

  
    <div className=' flex flex-col gap-3'>
    <div className=' flex justify-between items-center pb-8'>
       <p className=" text-[#030229]/80 font-semibold">Total Found Raised</p>   
   
    </div>

      <BookedChart  />

    </div>

  

    </div>

       <div className=" w-full md:w-[50%] lg:w-[40%]  bg-white rounded-[18px] h-fit pt-7 px-4 pb-4 ">


      
    <div className=' flex flex-col gap-3'>
    <div className=' flex justify-between items-center pb-3'>
       <p className="text-[#030229]/80  font-semibold">Analytics</p>   
     
    </div>

    <div className=' flex flex-col  gap-6'>

    <div className='  w-full xs:w-[60%] lg:w-full xl:w-[60%] h-full mx-auto'>
   <DoughnutChart  />
    </div>


    {/* totla */}
    <div className=' w-full   flex flex-row   justify-center gap-8 '>
    <div className='flex flex-col gap-1'>
    <p className='text-[#030229]/80  text-xs xs:text-sm '>Events</p>
    <div className='flex flex-row  items-center gap-2 justify-start'>
    <div className=' bg-[#5B93FF] w-[13px] h-[13px]   rounded-sm'>

    </div>
    <p className=' font-semibold  text-xl'>2k</p>

    </div>

    </div>

     <div className='flex flex-col gap-1'>
    <p className='text-[#030229]/80  text-xs xs:text-sm '>Programs</p>
    <div className='flex flex-row  items-center gap-2 justify-start'>
    <div className=' bg-[#FFD66B] w-[13px] h-[13px]  rounded-sm'>

    </div>
    <p className=' font-semibold  text-xl'>1.5k</p>

    </div>

    </div>


     <div className='flex flex-col gap-1'>
    <p className='text-[#030229]/80  text-xs xs:text-sm '>Donations</p>
    <div className='flex flex-row  items-center gap-2 justify-start'>
    <div className=' bg-[#FF8F6B] w-[13px] h-[13px]   rounded-sm'>

    </div>
    <p className=' font-semibold  text-xl'>2k</p>

    </div>

    </div>


  

    </div>

    </div>

   

    </div>

  

    </div>


    </div>
  )
}

export default DashboardChart