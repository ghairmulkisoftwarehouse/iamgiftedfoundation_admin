import { useRef, useState } from "react";
import useClickOutside from "../../../utils/clickOutside";
import AngleArrowSvg from "../../../assets/svgs/AngleArrowSvg";

const InputOption = ({ label, name, value = "", onChange, error, readOnly = false, options = [] }) => {
  const containerRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useClickOutside(containerRef, () => setShowMenu(false));

  const isActive = focused || value;

  const handleSelect = (item) => {
    onChange(item.title); // update the parent formData
    setShowMenu(false);
  };

  return (
    <div className="w-full flex flex-col gap-2" ref={containerRef}>
      <div
        className={`relative h-[50px] rounded-[10px] border transition-all duration-300
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}
        `}
        onClick={() => !readOnly && setShowMenu((prev) => !prev)}
      >
        {/* Arrow */}
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200
            ${showMenu ? "rotate-180" : ""}
          `}
        >
          <AngleArrowSvg />
        </div>

        {/* Input */}
        <input
          id={name}
          name={name}
          value={value}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Select an option"
          className={`w-full h-full px-4 pr-10 rounded-[10px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 px-1 bg-white text-[13px] sm:text-sm pointer-events-none transition-all duration-300
            ${isActive ? `-top-3 ${error ? "text-red-500" : "text-black"}` : "-top-3 text-lightGray"}
          `}
        >
          {label}
        </label>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-md border border-black/20 shadow-lg z-[1000]">
            <ul className="py-2 max-h-[220px] overflow-auto">
              {options.map((item) => (
                <li
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary/5 ${
                    item.title === value ? "bg-primary/10 font-medium" : ""
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputOption;
