import AutoConversationsSvg from '../../../assets/svgs/AutoConversationsSvg';
import CarryingDonationSvg from '../../../assets/svgs/CarryingDonationSvg';

const DashboardCard = () => {
  return (
  <div className="w-full grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-2.5">

  <div className="h-auto xs:h-[113px] bg-white rounded-3xl flex flex-col justify-between px-3.5 py-3.5 cursor-pointer
                  transform transition-all duration-300  hover:shadow-lg">
    <p className="text-sm sm:text-[15px] font-semibold">Donation Count (All-time)</p>
    <div className="flex justify-between w-full">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-xl sm:text-[20px] lg:text-[22px] font-semibold">2,560x</h2>
        <div className="bg-[#E5F2FA] px-2 py-1 text-[10px] font-medium rounded-full flex items-center gap-0.5">
          <AutoConversationsSvg />
          <span>+0.5%</span>
        </div>
      </div>
      <div className="w-[35px] h-[35px] sm:w-[44px] sm:h-[44px] bg-black rounded-full flex justify-center items-center">
        <CarryingDonationSvg className="w-[20px] h-[20px] sm:w-auto sm:h-auto" />
      </div>
    </div>
  </div>

  <div className="h-auto xs:h-[113px] bg-white rounded-3xl flex flex-col justify-between px-3.5 py-3.5
                  transform transition-all duration-300  hover:shadow-lg cursor-pointer">
    <p className="text-sm sm:text-[15px] font-semibold">Total Donation Amount (All-time)</p>
    <div className="flex justify-between w-full">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-xl sm:text-[20px] lg:text-[22px] font-semibold">2,560x</h2>
        <div className="bg-[#E5F2FA] px-2 py-1 text-[10px] font-medium rounded-full flex items-center gap-0.5">
          <AutoConversationsSvg />
          <span>+0.5%</span>
        </div>
      </div>
      <div className="w-[35px] h-[35px] sm:w-[44px] sm:h-[44px] bg-black rounded-full flex justify-center items-center">
        <CarryingDonationSvg className="w-[20px] h-[20px] sm:w-auto sm:h-auto" />
      </div>
    </div>
  </div>

  <div className="h-auto xs:h-[113px] bg-white rounded-3xl flex flex-col justify-between px-3.5 py-3.5
                  transform transition-all duration-300  hover:shadow-lg cursor-pointer">
    <p className="text-sm sm:text-[15px] font-semibold">Donation Count (All-time)</p>
    <div className="flex justify-between w-full">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-xl sm:text-[20px] lg:text-[22px] font-semibold">2,560x</h2>
        <div className="bg-[#E5F2FA] px-2 py-1 text-[10px] font-medium rounded-full flex items-center gap-0.5">
          <AutoConversationsSvg />
          <span>+0.5%</span>
        </div>
      </div>
      <div className="w-[35px] h-[35px] sm:w-[44px] sm:h-[44px] bg-black rounded-full flex justify-center items-center">
        <CarryingDonationSvg className="w-[20px] h-[20px] sm:w-auto sm:h-auto" />
      </div>
    </div>
  </div>

  <div className="h-auto xs:h-[113px] bg-white rounded-3xl flex flex-col justify-between px-3.5 py-3.5
                  transform transition-all duration-300  hover:shadow-lg cursor-pointer">
    <p className="text-sm sm:text-[15px] font-semibold">Donation Count (All-time)</p>
    <div className="flex justify-between w-full">
      <div className="flex flex-row items-center gap-1">
        <h2 className="text-xl sm:text-[20px] lg:text-[22px] font-semibold">2,560x</h2>
        <div className="bg-[#E5F2FA] px-2 py-1 text-[10px] font-medium rounded-full flex items-center gap-0.5">
          <AutoConversationsSvg />
          <span>+0.5%</span>
        </div>
      </div>
      <div className="w-[35px] h-[35px] sm:w-[44px] sm:h-[44px] bg-black rounded-full flex justify-center items-center">
        <CarryingDonationSvg className="w-[20px] h-[20px] sm:w-auto sm:h-auto" />
      </div>
    </div>
  </div>

</div>

  );
};

export default DashboardCard;
