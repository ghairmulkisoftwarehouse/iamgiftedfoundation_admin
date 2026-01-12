
import BloodTestSvg from '../../../assets/svgs/BloodTestSvg';
import { RxCross1 } from "react-icons/rx";
import DotSvg from '../../../assets/svgs/DotSvg';
import ProgramImg from '../../../assets/images/programdeatil.png';


const EventDetail = () => {

  return (
      <div className="bg-white rounded-[15px] p-4 flex flex-col gap-4">
      <div className=' flex justify-between items-center w-full'>
        <div
            className="
              font-medium text-sm flex items-center gap-1
              px-3 py-1.5 rounded-full bg-[#E5D5E5]

              transition-all duration-500
              group-hover:bg-[#d6bfd6]
              group-hover:shadow-sm
            "
          >
            <DotSvg />
           Active
          </div>
          <RxCross1/>



      </div>
      <h2 className=' font-medium text-base md:text-lg leading-4'>Green Tech for Rural Energy</h2>
        
        <div className='bg-[#F4F6F6]  rounded-[15px] flex flex-col gap-2'>
        <div className=' w-full  h-[212px]  rounded-[16px] overflow-hidden'>
        <img 
          src={ProgramImg}
          alt='img'
          className=' w-full   h-full object-cover'/>

        </div>
      <div className="grid grid-cols-3 gap-1 xs:gap-2 w-full p-4">
  <div
    className="
      bg-white py-3 rounded-[12px]
        cursor-pointer
      flex flex-col items-center gap-0.5
      transition-all duration-700 ease-in-out
      hover:shadow-md hover:-translate-y-0.5
    "
  >
    <h2 className="text-xs xs:text-[13px] sm:text-sm font-semibold">11:49</h2>
    <p className="text-xs xs:text-[13px] sm:text-sm text-black/60">Time</p>
  </div>

  <div
    className="
      bg-white py-3 rounded-[12px]
        cursor-pointer
      flex flex-col items-center gap-0.5
      transition-all duration-700 ease-in-out
      hover:shadow-md hover:-translate-y-0.5
    "
  >
    <h2 className="text-xs xs:text-[13px] sm:text-sm font-semibold">236</h2>
    <p className="text-xs xs:text-[13px] sm:text-sm text-black/60">Shares</p>
  </div>

  <div
    className="
      bg-white py-3 rounded-[12px]
       cursor-pointer
      flex flex-col items-center gap-0.5
      transition-all duration-700 ease-in-out
      hover:shadow-md hover:-translate-y-0.5
    "
  >
    <h2 className="text-xs xs:text-[13px] sm:text-sm font-semibold">5</h2>
    <p className="text-xs xs:text-[13px] sm:text-sm text-black/60">Days left</p>
  </div>
</div>

    

        </div>

      <div className=" grid grid-cols-1  gap-4">
        {/* Organizer card */}
       
           <div className="flex flex-col gap-2.5 bg-[#F4F6F6] px-3 py-3 rounded-[15px]">
          <h2 className="font-medium text-sm md:text-base">Organizer:</h2>

          <div className="bg-white px-3 py-3 rounded-[15px] flex flex-row gap-2.5 items-center">
            <div className="w-[35px] h-[35px] bg-[#F4F6F6] rounded-full flex justify-center items-center">
              <BloodTestSvg />
            </div>

            <div className="flex flex-col gap-0.5">
              <h2 className="font-medium text-[13px] md:text-sm">
                EcoFuture Labs
              </h2>
              <p className="text-[10px] md:text-xs text-[#878787]">
                Verified Organization
              </p>
            </div>
          </div>
        </div>


 
       <div className=' flex flex-col gap-1'>
        <h2 className=' text-[13px] sm:text-sm  font-medium'>Story</h2>
        <p className=' text-black/90    text-xs sm:text-[13px]  leading-6'>Green Tech for Rural Energy is a forward-thinking initiative by EcoFuture Labs, dedicated to providing sustainable solar and wind-powered energy solutions in underserved rural areas. <br/>
        This campaign focuses on installing compact, renewable energy systems that can power homes, schools, and small businesses, reducing reliance on fossil fuels and creating long-term environmental benefits.
Each donation brings clean energy closer to communities that need it most, lighting up lives, empowering growth, and building a greener tomorrow.</p>

       </div>
        
      

      </div>
    </div>
  )
}

export default EventDetail