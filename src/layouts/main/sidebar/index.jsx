import React, { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoSvg from '../../../assets/svgs/SidebarLogoSvg';
import { menuItems } from '../../../constants/sidebarConstants';
import "./siderbar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto sidebar-scroll pb-14 md:pb-10">

      {/* Logo */}
      <div className="flex justify-center h-[70px] px-1 items-center">
        <LogoSvg className="w-auto h-[50px]" />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 w-full px-3 pt-5">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={index}
              onClick={() => item.path !== '/' && navigate(item.path)}
              className={`
                flex flex-row items-center gap-2
                h-[50px] pl-5 cursor-pointer rounded-[9px]
                transition-all duration-300 ease-in-out
                ${isActive
                  ? 'bg-lightBlue border-l-4 border-thistle'
                  : 'hover:bg-lightBlue hover:border-l-4 border-thistle'}
              `}
            >
              {/* Icon */}
              <Icon active={isActive} />

              {/* Text */}
              <p className={`text-[13px] xs:text-sm font-medium
                ${isActive ? 'text-black' : 'text-blueGray'}
              `}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Sidebar);
