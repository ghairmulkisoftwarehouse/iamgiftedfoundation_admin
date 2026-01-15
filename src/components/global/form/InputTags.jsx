import { useRef, useState } from "react";
import useClickOutside from "../../../utils/clickOutside";
import AngleArrowSvg from "../../../assets/svgs/AngleArrowSvg";
import { RxCross2 } from "react-icons/rx";

const InputTags = ({
  label,
  name,
  value = [],
  onChange,
  error,
  readOnly = false,
}) => {
  const containerRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useClickOutside(containerRef, () => setShowMenu(false));

  const dummyManagers = [
    { id: 1, title: "CleanEnergy" },
    { id: 2, title: "SolarHope" },
    { id: 3, title: "InnovationForChange" },
    { id: 4, title: "BrightFuture" },
    { id: 5, title: "EcoVision" },
    { id: 6, title: "GreenPlanet" },
    { id: 7, title: "SustainableTech" },
    { id: 8, title: "FutureNow" },
    { id: 9, title: "EarthGuardians" },
    { id: 10, title: "NextGenEnergy" },
  ];

  const isActive = focused || value.length > 0;

  const isSelected = (id) => value.some((tag) => tag.id === id);

  const handleSelect = (item) => {
    if (!isSelected(item.id)) {
      onChange([...value, item]);
   
    }
  };

  const handleRemove = (id) => {
    onChange(value.filter((tag) => tag.id !== id));
  };
  

  return (
    <div className="w-full flex flex-col gap-2" ref={containerRef}>
      <div
        className={`relative h-[50px] rounded-[10px] border transition-all duration-300
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}
        `}
        onClick={() => !readOnly && setShowMenu(true)}
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
          value=""
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Choose Event Tags"
          className={`w-full h-full px-4 pr-10 rounded-[10px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 px-1 bg-white text-[13px] sm:text-sm pointer-events-none transition-all duration-300
            ${
              isActive
                ? `-top-3 ${error ? "text-red-500" : "text-black"}`
                : "-top-3 text-lightGray"
            }
          `}
        >
          {label}
        </label>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-md border border-black/20 shadow-lg z-[1000]">
            <ul className="py-2 max-h-[220px] overflow-auto">
              {dummyManagers.map((item) => (
              <li
  key={item.id}
  onClick={(e) => {
    e.stopPropagation(); 
    if (isSelected(item.id)) {
      handleRemove(item.id);
    } else {
      handleSelect(item);
    }
    setShowMenu(false);
  }}
  className={`px-4 py-2 text-sm cursor-pointer transition-colors
    ${isSelected(item.id) ? "bg-black text-white" : "hover:bg-primary/5"}
  `}
>
  {item.title}
</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Selected Tags */}
      <div className="flex flex-row flex-wrap gap-2">
        {value.map((tag) => (
          <div
            key={tag.id}
            className="bg-[#F4F9FD] px-2.5 py-2.5 rounded-[6px] text-xs md:text-[13px] flex gap-1 items-center"
          >
            <span>#</span>
            {tag.title}
            {!readOnly && (
              <span
                className="cursor-pointer text-red-500"
                onClick={() => handleRemove(tag.id)}
              >
                <RxCross2 />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputTags;
