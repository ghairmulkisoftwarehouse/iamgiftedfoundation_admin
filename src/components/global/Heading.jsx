import React, { memo } from 'react'
import formatLabel from '../../utils/formatLabel';
import { useLocation } from 'react-router-dom';

const Heading = () => {
       const location = useLocation();
           const pathSegments = location.pathname.split('/'); // ['', 'app', 'dashboard']
  let heading = '';
  if (pathSegments[1] === 'app' && pathSegments[2]) {
    heading = pathSegments[2].charAt(0).toUpperCase() + pathSegments[2].slice(1); // Capitalize first letter
  }

    return (
        <div className=' w-full  block lg:hidden'>
             {heading && (
                 <div className="flex items-center min-w-0 ">
                   <span className="inline-block ml-2 text-[20px] sm:text-[22px] md:text-2xl lg:text-[26px] text-[#1A1C1E] font-semibold truncate">
                     {formatLabel(heading)}
                   </span>
                 </div>
               )}
          
        </div>
    )
}

export default memo(Heading)