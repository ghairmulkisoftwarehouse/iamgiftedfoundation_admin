
import React, { memo } from 'react'



const Status = ({ status }) => {
    return (
        <div
        className={`
            ${
                status === 'pending' || status === 'running' ||  status === 'Pending' 
                ? 
                    'bg-thistle'
                : 
                status === 'completed' || status === 'approved' || status === 'claimed' || status === 'active' || status === 'Active'  || status === 'accepted' || status === 'Successful'
                ?
                    'bg-[#ECF8F0CC]  text-[#1C8C6E]'
                : 
                status === 'declined' || status === 'cancelled' || status === 'rejected' || 'expired'
                ? 
                    'bg-[#DB000026] text-[#DB0000]'
                : 
                status === 'dispatched'
                ? 
                    'bg-cyan-500 bg-opacity-30 text-cyan-500'
                :
                status === 'failed'
                ? 
                    'bg-orange-500 bg-opacity-30 text-orange-500'
                :
                    ''
            }
            text-xs sm:text-sm px-2 rounded-md flex items-center gap-1 py-1 pb-1.5 font-normal w-fit capitalize
        `}
        >
            
            <span>
                {status}
            </span>
        </div>
    )
}

export default memo(Status)