import { useRef } from "react";
import ArrowSvg from "../../assets/svgs/ArrowSvg";
import useToggle from "../../hooks/useToggle";
import useClickOutside from "../../utils/clickOutside";

export default function SelectOption({ title = "Type", options = [],  onSelect, }) {
  const menuRef = useRef();
  const [showMenu, toggleShowMenu] = useToggle();
  useClickOutside(menuRef, () => toggleShowMenu(false));

  return (
    <div
      className="flex items-center gap-3 cursor-pointer relative"
      ref={menuRef}
    >
      {/* Dropdown Button */}
      <div
        className="bg-[#001719] flex justify-center items-center gap-1.5 rounded-md w-fit px-3 tiny-normal:px-0  tiny-normal:w-[125px] h-[36px] py-2.5"
        onClick={toggleShowMenu}
      >
        <h2 className="text-white text-xs tiny-normal:text-sm">{title}</h2>
        <ArrowSvg rotated={showMenu} strokeColor="#FFFFFF" />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-14 w-[230px] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white z-50 transition-all duration-200 ease-in-out transform ${
          showMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mt-2">
       {options.map((option, index) => (
  <div
    key={index}
    className="px-4 py-2 text-sm text-dark1 hover:bg-gray-100 cursor-pointer"
    onClick={() => {
      onSelect(option);   
      toggleShowMenu(false);
    }}
  >
    {option}
  </div>
))}
        </div>
      </div>
    </div>
  );
}
