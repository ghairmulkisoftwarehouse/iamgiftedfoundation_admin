import { useState } from "react";
import AppDonarsTable  from './AppDonarsTable';
import ImpactAppUserTable from './ImpactAppUserTable';
import AppUserWishesList  from './AppUserWishesList';
import AppUserEventTable   from './AppUserEventTable';
const AppUserTable = () => {
      const [active, setActive] = useState("Donors");
        const stats = [
    { label: "Donors", },
      { label: "Join Events", },
    { label: "Wishes",  },
    { label: "Impacts", },
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
           
          </div>
        );
      })}
    </div>



    </div>
    {
      active ==='Donors' && (
          <AppDonarsTable/>
      )
    }





 {
      active ==='Wishes' && (
          <AppUserWishesList/>
      )
    }


 {
      active ==='Join Events' && (
         <AppUserEventTable/>
      )
    }
    

      {
      active ==='Impacts' && (
           <ImpactAppUserTable/>
      )
    }
   
   
   

    </div>
  )
}

export default AppUserTable