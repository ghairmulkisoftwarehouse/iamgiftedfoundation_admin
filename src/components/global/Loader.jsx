import { memo } from 'react';
import CustomLoader   from './customloader'

const Loader = ({ h = 200 }) => {
    return (
        <div 
            style={{ height: h }} // Dynamic height
            className="w-full rounded-md bg-white flex items-center justify-center mt-2 box-shadow"
        >
            <div className="flex items-center">
                <CustomLoader />
                <span className="ml-2 font-medium">Loading...</span> 
            </div>
        </div>
    )
}
export default memo(Loader)