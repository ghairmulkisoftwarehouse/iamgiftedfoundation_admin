import { useState } from "react";
import Titlebtn from '../../../../components/global/Titlebtn';
import FundraisingDonarsTable  from './FundraisingDonarsTable';
import ImpactFundraisingTable from './ImpactFundraisingTable';
import FundraisingWishesList  from './FundraisingWishesList';
const FundraisingTable = () => {
      const [active, setActive] = useState("Donors");
        const stats = [
    { label: "Donors", count: 19 },
    { label: "Wishes", count: 19 },
    { label: "Impacts", count: 19 },
  ];

  return (
    <div  className=" flex flex-col gap-2.5">
    <div className=' flex flex-col gap-2.5 lg:flex-row lg:justify-between lg:items-center w-full'>
 

        <div className="flex gap-5 bg-white  rounded-[8px] px-5 py-2.5 w-full flex-wrap lg:w-fit  cursor-pointer   order-2  lg:order-1">
      {stats.map((item) => {
        const isActive = active === item.label;

        return (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`
              flex gap-1.5 items-center
              rounded-[8px] px-2 py-1.5 w-fit cursor-pointer
              ${isActive ? "bg-[#B6E2E2] text-black" : "bg-white text-black"}
              transition-all duration-300
            `}
          >
            <p className="text-sm font-medium">{item.label}</p>
            <div
              className={`
                w-[30px] h-[28px] rounded-[8px] flex justify-center items-center text-sm font-medium
                ${isActive ? "bg-white text-black" : "bg-black text-white"}
              `}
            >
              {item.count}
            </div>
          </div>
        );
      })}
    </div>

<div className="  order-1 lg:order-2 flex justify-end">
    <Titlebtn  label='Impact'   url = "/app/create-Impact/1" />
</div>

    </div>
    {
      active ==='Donors' && (
          <FundraisingDonarsTable/>
      )
    }

 {
      active ==='Wishes' && (
          <FundraisingWishesList/>
      )
    }

    

      {
      active ==='Impacts' && (
           <ImpactFundraisingTable/>
      )
    }
   
   
   

    </div>
  )
}

export default FundraisingTable