import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'
import { usePannelContext } from '../../context/PannelContext';


const MainLayout = () => {
 
      const { showPannel, setShowPannel } = usePannelContext();

    const sidebarRef = useRef();
     const handleCloseSidebar = () => {
    setShowPannel(false);
  };
   


    return (
        <div className='relative '>
      
            <div 
            ref={sidebarRef}
            className={`
                fixed   lg:left-0 transition-all bg-white  h-screen  duration-300 w-[250px] z-[80] 
                border-r-2 border-r-lightGray/20 
                 ${showPannel ? "left-0" : "-left-[150%]"}`}>
                <Sidebar />
            </div>
            {/* Sidebar Overlay */}
            {showPannel && (
        <div
          className="fixed top-0 left-0 bg-gray-900/30 w-full h-screen bg-opacity-30 z-50"
          onClick={handleCloseSidebar}
        ></div>
      )}
            {/* Main Content Area */}
            <div className=' w-full  lg:pl-[250px]'>
                <Header />
                <div 
                className='sm:p-6 p-4 bg-stroke'
                style={{ minHeight : 'calc(100vh - 65px)' , height : '100%'}}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
