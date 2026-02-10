import { useRef, useState } from "react";
import useClickOutside from "../../../utils/clickOutside";
import AngleArrowSvg from "../../../assets/svgs/AngleArrowSvg";

const CategoryType = ({ label, selected, onSelect, error, readOnly = false }) => {
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  const options = ["Event", "Impact"]; 

  useClickOutside(containerRef, () => setShowMenu(false));

  const handleSelect = (item) => {
    onSelect(item);   // parent state update
    setShowMenu(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onSelect("");      // clear parent state
  };

  const isActive = focused || !!selected;

  return (
    <div ref={containerRef} className="flex flex-col gap-1 relative">
      <div
        onClick={() => !readOnly && setShowMenu((prev) => !prev)}
        className={`relative h-[50px] rounded-[10px] border px-4 flex items-center cursor-pointer
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}`}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {selected && !readOnly ? (
            <button onClick={handleClear} className="text-gray-400 hover:text-black text-sm">✕</button>
          ) : (
            <div className={`transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}>
              <AngleArrowSvg />
            </div>
          )}
        </div>

        <label className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
          ${isActive ? `-top-3 ${error ? "text-red-500" : "text-black"}` : "-top-3 text-lightGray"}`}
        >
          {label}
        </label>

        <input
          value={selected || ""}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Select Type"
          className={`w-full h-full rounded-[10px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}`}
        />
      </div>

      {showMenu && (
        <ul className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-md border border-black/20 shadow-lg z-[1000] py-2">
          {options.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {error && <span className="text-red-500 text-[11px] sm:text-xs">{error}</span>}
    </div>
  );
};

export default CategoryType;