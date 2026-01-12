
import img from '../../../assets/images/Desertimg.png'
import DotSvg from '../../../assets/svgs/DotSvg';

const ProgramCard = () => {
  return (
    <div  className=" bg-white w-full flex flex flex-col gap-2    rounded-[15px]">
       <div className="rounded-tl-[15px] rounded-tr-[15px] w-full h-[250px]  sm:h-[200px] xl:h-[300px] overflow-hidden">
            <img
            src={img}
            alt="img"
            className="
                w-full h-full object-cover
                transition-transform duration-700 ease-in-out
                hover:scale-105
            "
            />
        </div>

      
      <div className=' px-3 py-2.5  w-full flex flex-col   gap-2'>
                <div className=' flex justify-between items-center  w-full'>
                        <div className=' text-sm'>
                            Disaster Relief
                        </div>
                         <div
                            className="
                                w-fit font-medium text-[13px]
                                flex items-center gap-1
                                px-3 py-1.5 rounded-full bg-[#E5D5E5]
                                 cursor-pointer
                                transition-all duration-500
                                hover:bg-[#d6bfd6]
                            "
                            >
                            <DotSvg />
                            Active
                        </div>
                </div>
                 
                 <div className=' text-[15px]  sm:text-base xl:text-lg font-medium'>
                   Rebuild Hope After the Earthquake
                 </div>
                  
                  <div className='flex flex-col gap-0.5'>
                  <div className="flex justify-between items-center w-full  font-medium">
                        <p className="text-black  text-[10px] xs:text-xs md:text-sm">Progress: 91%</p>
                       <div >
                       <span className="font-medium text-sm sm:text-base">$120,000</span>
                       <span className=" text-xs sm:text-sm text-black/60 font-medium">
                         /$150,000
                       </span>
                        </div>
            
              </div>
                   <div className="w-full  bg-[#B2BCC599] rounded-full h-2 overflow-hidden">
                        <div
                            className="
                            bg-[#9BD6F6] h-2 rounded-full
                            transition-all duration-700 ease-in-out
                            "
                            style={{ width: `60%` }}
                        />
                                </div>  

                  </div> 

                  <div className='grid grid-cols-1 xs:grid-cols-3 gap-2 w-full   pt-3'>
                  <div className='       rounded-[10px] bg-[#F4F9FD] py-4
                            flex flex-col items-center justify-center
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 hover:shadow-lg hover:bg-white
                            cursor-pointer'>
                  <h2 className=' font-medium text-m md:text-base '>$100</h2>
                  <p className=' text-xs md:text-sm text-black/60'  >Donation</p>

                  </div>
                 <div className='       rounded-[10px] bg-[#F4F9FD] py-4
                            flex flex-col items-center justify-center
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 hover:shadow-lg hover:bg-white
                            cursor-pointer'>
                  <h2 className=' font-medium text-m md:text-base '>$100</h2>
                  <p className=' text-xs md:text-sm text-black/60'  >Donation</p>

                  </div>

                   <div className='       rounded-[10px] bg-[#F4F9FD] py-4
                            flex flex-col items-center justify-center
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 hover:shadow-lg hover:bg-white
                            cursor-pointer'>
                  <h2 className=' font-medium text-m md:text-base '>$100</h2>
                  <p className=' text-xs md:text-sm text-black/60'  >Donation</p>

                  </div>
                 
                  </div>
               

     

      </div>
    </div>
  )
}

export default ProgramCard