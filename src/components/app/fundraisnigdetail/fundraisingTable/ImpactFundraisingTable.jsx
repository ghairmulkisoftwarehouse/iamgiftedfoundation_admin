import ArrowTopSvg from "../../../../assets/svgs/ArrowTopSvg";


import SelectOption  from '../../../../components/global/SelectOption';




const ImpactFundraisingTable = () => {
const dataTable = [
  {
    type: "Donor",
    title: "Education Support",
    description:
      "Providing school supplies and tuition assistance to children in need.",
    fundsUses: "School Kits & Fees",
    impactCount: 120,
  },
  {
    type: "Participation",
    title: "Clean Water Project",
    description:
      "Installing clean water wells in rural and underserved communities.",
    fundsUses: "Water Wells",
    impactCount: 85,
    
  },
  {
    type: "Volunteer",
    title: "Food Drive",
    description:
      "Distributing essential food packages to low-income families.",
    fundsUses: "Food Packages",
    impactCount: 200,
 
  },
 
 
];

  const typeOptions = ["Donor", "Participation", "Volunteer"];

  return (
    <div className="w-full table-container bg-white flex flex-col gap-1 p-4">
      <div className="flex flex-row justify-between items-center w-full px-3 pt-2">
        <p className="text-black font-semibold">Donations</p>
        <SelectOption title="Latest" options={typeOptions} />

      </div>

      { dataTable.length === 0 ? (
        <p className="text-center py-6 text-gray-400">
          No Recent Donation found.
        </p>
      ) : (
         <div className="overflow-x-auto maintable">
          <table className="w-full mt-5  min-w-max md:min-w-full">
            <thead className="text-left text-[13px] sm:text-sm md:text-[15px] ">
              <tr>
                <th className="px-3 py-4 rounded-tl-[12px] rounded-bl-[12px]">
               <div className="flex items-center gap-0.5">  
            Type
               <ArrowTopSvg/>
                </div>
               </th>
                <th className="px-3 py-4">
                    <div className="flex items-center gap-0.5">  
           Title
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                   <div className="flex items-center gap-0.5">  
          Description
               <ArrowTopSvg/>
                </div>
                
                </th>
                <th className="px-3 py-4">
                
                  <div className="flex items-center gap-0.5">  
         Founds Uses
               <ArrowTopSvg/>
                </div>
                </th>
                <th className="px-3 py-4">
                    <div className="flex items-center gap-0.5">  
                Impect Count               
                
                <ArrowTopSvg/>
                </div>
              </th>
         
              </tr>
            </thead>

            <tbody>
              {dataTable.map((row, index) => (
                <tr key={index} className="border-t">

                  <td className="px-3 py-4  whitespace-nowrap ">
                    {row.type}
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap ">
                     {row.title}
                  </td>

               <td className="px-3 py-4 max-w-[280px] md:max-w-[300px] break-words ">
  <span className="text-black/65">
    {row.description}
  </span>
</td>

                  <td className="px-3 py-4  whitespace-nowrap">
                    {row.fundsUses}
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap">
                    {row.impactCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
      )}

      
    </div>
  );
};

export default ImpactFundraisingTable;
