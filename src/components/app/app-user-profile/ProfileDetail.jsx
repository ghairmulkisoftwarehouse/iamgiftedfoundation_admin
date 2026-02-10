import img from '../../../assets/images/img1.jpg'
import { useSelector } from 'react-redux'
import { baseURL } from '../../../config/api';


const ProfileDetail = () => {
    const { docDetails } = useSelector((state) => state.appUser);

  return (
  <div className="bg-white py-7 rounded-[24px] px-6 flex  flex-col md:flex-row md:items-center gap-6">
  
  {/* Left Section */}
  <div className=" basis-full md:basis-[50%] ">
    <div className="flex items-center gap-4">
      
      <div className=" w-[80px] h-[80px] xs:w-[100px] xs:h-[100px] xl:w-[120px] xl:h-[120px] rounded-full overflow-hidden">
      
        <img
          src={
               docDetails?.image?.relativeAddress
                    ? `${baseURL}/${docDetails?.image?.relativeAddress}`
               : img
            }
          alt="img"
          className="w-full h-full object-cover"
        />

        
      </div>

      <div className="flex flex-col gap-2 xs:gap-3">
        <h2 className="font-semibold text-xl xs:text-2xl xl:text-[26px] text-[#1A1C1E]">
          {docDetails?.username}
        </h2>
        <p className="text-[#1A1C1E]/90 font-medium text-sm xs:text-base xl:text-lg">
          Donor:
          <span className="text-[#1A1C1E]/50 font-medium">
            {" "}#
          </span>
        </p>
      </div>

    </div>
  </div>

  {/* Right Section */}
  <div className="basis-full md:basis-[50%]   md:border-l-2 border-dashed border-[#202224]/30 flex flex-col gap-4 pl-4">
    <div className="flex gap-1.5 sm:gap-0 w-full">
      
      <div className="  w-fit sm:w-1/2">
        <h2 className=" font-normal text-[#202224] text-sm  xl:text-[15px]">Phone:</h2>
      </div>

      <div className=" w-fit sm:w-1/2">
        <p className=" font-normal  text-black text-sm  xl:text-[15px]">{docDetails?.phone}</p>
      </div>

    </div>

     <div className="flex gap-1.5 sm:gap-0 w-full">
      
      <div className=" w-fit sm:w-1/2">
        <h2 className=" font-normal text-[#202224] text-sm  xl:text-[15px]">Email:</h2>
      </div>

      <div className=" w-fit sm:w-1/2">
        <p className=" font-normal  text-black text-sm  xl:text-[15px]">{docDetails?.email}</p>
      </div>

    </div>

     <div className="flex gap-1.5 sm:gap-0 w-full">
      
      <div className=" w-fit sm:w-1/2">
        <h2 className=" font-normal text-[#202224]  text-sm  xl:text-[15px]">City:</h2>
      </div>

      <div className=" w-fit sm:w-1/2">
        <p className=" font-normal  text-black  text-sm  xl:text-[15px]"></p>
      </div>

    </div>

     <div className="flex gap-1.5 sm:gap-0 w-full">
      
      <div className=" w-fit sm:w-1/2">
        <h2 className=" font-normal text-[#202224] text-sm  xl:text-[15px]">Address:</h2>
      </div>

      <div className=" w-fit sm:w-1/2">
        <p className=" font-normal  text-black text-sm  xl:text-[15px]"></p>
      </div>

    </div>


     



  </div>

</div>

  )
}

export default ProfileDetail