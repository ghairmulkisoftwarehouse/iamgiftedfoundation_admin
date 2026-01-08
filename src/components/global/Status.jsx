
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
                status === 'completed' || status === 'approved' || status === 'claimed' || status === 'active' || status === 'accepted' || status === 'Successful'
                ?
                    'bg-[#D8ECF7]  text-black'
                : 
                status === 'declined' || status === 'cancelled' || status === 'rejected' || 'expired'
                ? 
                    'bg-red-500 bg-opacity-30 text-[#FF0000]'
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