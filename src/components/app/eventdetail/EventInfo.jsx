import { useState } from 'react';
import BloodTestSvg from '../../../assets/svgs/BloodTestSvg';
import AccordianDownSvg from '../../../assets/svgs/AccordianDownSvg';
import { impactProjects, bankCards } from '../../../constants/dataConstants';

const EventInfo = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white rounded-[15px] p-4">
      <h2 className="font-semibold text-base md:text-lg mb-4">
        Fundraising Info
      </h2>

      <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1  gap-4">
        {/* Organizer card */}
        <div className=' lg:col-span-2 '>
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

        </div>
      

        {/* Allocation Plan card */}
         <div className=' xl:col-span-2 '>
        <div className="flex flex-col gap-2.5 bg-[#F4F6F6] px-3 py-3 rounded-[15px]">
          <h2 className="font-medium text-sm md:text-base">
            Allocation Plan:
          </h2>

          <div className="flex justify-between items-center">
            <p className="text-[13px] md:text-sm font-normal">Traget</p>
            <h2 className="text-[15px] md:text-base font-medium">
              $200,000
            </h2>
          </div>

          {/* Allocation accordion */}
          {impactProjects.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white px-3 pt-3 rounded-[15px]
                flex flex-col gap-2.5 w-full
                ${openIndex === index ? 'pb-3' : 'pb-0'}
              `}
            >
              {/* Header */}
              <div
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className={`
                  flex justify-between items-center w-full
                  pb-1.5 cursor-pointer select-none
                  ${
                    openIndex === index
                      ? 'border-b border-black/30'
                      : 'border-0'
                  }
                `}
              >
                <div className="flex gap-1 items-center">
                  <span
                    className={`
                      transition-transform duration-300
                      ${
                        openIndex === index
                          ? 'rotate-180'
                          : 'rotate-0'
                      }
                    `}
                  >
                    <AccordianDownSvg />
                  </span>

                  <p className="text-xs md:text-[13px] font-normal">
                    {item.title}
                  </p>
                </div>

                <p className="text-xs md:text-[13px] font-medium">
                  {item.amount}
                </p>
              </div>

              {/* Description */}
              <div
                className={`
                  grid transition-all duration-500 ease-in-out
                  ${
                    openIndex === index
                      ? 'grid-rows-[1fr] opacity-100 mt-2'
                      : 'grid-rows-[0fr] opacity-0 mt-0'
                  }
                `}
              >
                <div className="overflow-hidden">
                  <p className="text-xs md:text-[13px] text-[#878787] leading-[19px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        

        {/* Fund Disbursement card */}
              <div className=' xl:col-span-2 '>
        <div className="flex flex-col gap-2.5 bg-[#F4F6F6] px-3 py-3 rounded-[15px]">
          <h2 className="font-medium text-sm md:text-base">
            Fund Disbursement:
          </h2>

          <div className="flex justify-between items-center">
            <p className="text-[13px] md:text-sm font-normal">October</p>
            <h2 className="text-[15px] md:text-base font-medium">
              $110,000
            </h2>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            {bankCards.map((item, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-xl p-4 flex flex-col gap-3 shadow-sm"
              >
                {/* Header */}
                <div className="flex justify-between items-center bg-[#F4F9FD] py-1.5 px-2 rounded-md">
                  <p className="text-xs md:text-[13px] font-medium">
                    {item.title}
                  </p>

                  <p className="text-xs md:text-[13px] font-normal text-black/50">
                    {item.account}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs md:text-[13px] text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
