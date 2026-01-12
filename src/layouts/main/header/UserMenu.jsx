import useToggle from "../../../hooks/useToggle";
import useClickOutside from "../../../utils/clickOutside";
import { useRef } from "react";
import img from "../../../assets/images/img1.jpg";
import ArrowSvg from "../../../assets/svgs/ArrowSvg";
import SubmitLoading  from '../../../components/global/SubmitLoading';
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../../redux/actions/authActions";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { getToken, removeToken } from '../../../utils/cookies';


export default function Usermenu() {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle();
  useClickOutside(menuRef, () => toggleShowMenu(false));
   const dispatch=useDispatch();
   const navigate=useNavigate();

     const token = getToken();
     console.log('token',token)
   

  const { loading,user } = useSelector((state) => state.auth);
  
 console.log('user',user)

const handleLogout = async () => {
  try {
    await dispatch(logout(navigate, toast));
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error(err?.message || "Logout failed. Please try again.");
  }
};



  return (
    <div
      className="flex items-center gap-0.5 xs:gap-3 cursor-pointer relative"
      onClick={toggleShowMenu}
      ref={menuRef}
    >
      <div className="w-[40px] h-[40px]   overflow-hidden rounded-full">
        <img
          src={img}
          alt="user avatar"
          className="w-full h-full object-cover"
        />
      </div>
       <div className=" flex flex-col    hidden xs:block">
          <h3 className="text-[#1A1C1E]/50  text-sm font-normal  hidden sm:block">Hey, Welcome!</h3>
          <h2 className="text-[#1A1C1E] font-semibold hidden xs:block">M.Salman</h2>

       </div>
   
      <div >
  <ArrowSvg  rotated={showMenu}     />
      </div>
    

      <div
        className={`absolute right-0 top-14 w-[230px] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white z-50 transition-all duration-200 ease-in-out transform ${
          showMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4">
          <div className="flex items-center space-x-3">
            <img
              src={img}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">admin</h3>
              <p className="text-xs text-green-600 font-medium capitalize">
                user
              </p>
            </div>
          </div>
        </div>

        {/* Static dropdown content */}
        <div className="mt-2 border-t border-gray-200">

        <div className="px-4 py-2 text-sm text-dark1 hover:bg-gray-100 cursor-pointer">
          Dashboard
        </div>
        <div className="px-4 py-2 text-sm text-dark1 hover:bg-gray-100 cursor-pointer">
          Settings
        </div>
          <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-bright-red hover:bg-gray-100 w-full text-left font-medium"
        >
          {loading ? <SubmitLoading/>: "Logout"}
        </button>

        </div>
      </div>
    </div>
  );
}