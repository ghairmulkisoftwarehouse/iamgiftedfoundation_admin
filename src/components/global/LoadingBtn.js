import React, { memo } from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingBtn = () => {
    return (
        <p className='flex items-center gap-2 justify-center w-full'>
            <ClipLoader size={16}  color='white' />
            <span>Loading...</span>
        </p>
    )
}

export default memo(LoadingBtn)