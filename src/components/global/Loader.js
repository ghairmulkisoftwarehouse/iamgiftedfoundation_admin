import { memo } from 'react';
import LoadingBtn from './LoadingBtn';

const Loader = ({ h = 200 }) => {
    return (
        <div className={`w-full h-[200px] rounded-md border border-gray-700 flex items-center justify-center mt-2 box-shadow`}>
            <LoadingBtn />
        </div>
    )
}

export default memo(Loader)