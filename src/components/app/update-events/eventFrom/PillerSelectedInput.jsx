import { useEffect, useRef, useState,} from "react";
import useClickOutside from "../../../../utils/clickOutside";
import AngleArrowSvg from "../../../../assets/svgs/AngleArrowSvg";
import Axios from "../../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setStats } from "../../../../redux/slices/programPillarSlice";
import { ClipLoader } from "react-spinners";

const PillerSelectedInput = ({
  label,
  selected,
  value,    
  onSelect,
  error,
  readOnly = false,
}) => {
  const containerRef = useRef(null);
  const [localSelected, setLocalSelected] = useState("");
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

//  console.log(' this is a value',value)

  const dispatch = useDispatch();
  const { docs = [] } = useSelector((state) => state.programPillar);


//  console.log(' this is a  selected',selected)

  // Fetch pillars with programs
  const { isLoading, isError } = useQuery(
    ["fetch-all-pillarProgram"],
    async () => Axios.get(`/piller/with-programs-list?sortBy=createdAt_descending`),
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const { data: { data: { docs, pages, docsCount, page } } } = res;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  useClickOutside(containerRef, () => setShowMenu(false));

  // select a program
  const handleSelect = (item) => {
    onSelect(item?._id); // update formData.program
    setLocalSelected(item?.title); // update local display
    setShowMenu(false);
  };

  // clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    setLocalSelected("");
    onSelect(null);
  };

  const isActive = focused || !!value || !!selected;

  // get programs of the selected pillar
  const programs = docs.find((pillar) => pillar._id === selected?._id)?.programs || [];


  useEffect(() => {
  if (selected && value?._id) {
    // Find the program inside the selected pillar
    const initialProgram = programs.find(
      (program) => program._id === value._id
    );

    if (initialProgram) {
      setLocalSelected(initialProgram);
    } else {
      setLocalSelected("");
    }
  } else {
    setLocalSelected("");
  }
}, [selected, value, docs]);


  return (
    <div ref={containerRef} className={`flex flex-col gap-1 relative ${readOnly ? "cursor-not-allowed" : ""}`}>
      {/* Input Wrapper */}
      <div
        onClick={() => !readOnly && setShowMenu((prev) => !prev)}
        className={`relative h-[50px] rounded-[10px] px-4  border flex items-center cursor-pointer
          ${readOnly ? "bg-gray-100 cursor-not-allowed  border-black/20" : ""}
          ${error ? "border-red-500" : isActive ? " border-black" : "border border-lightGray"}
        `}
      >
        {/* Floating Label */}
        <label
          className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
            ${isActive ? `${error ? "text-red-500" : "text-black"} -top-3` : "-top-3 text-lightGray"}
          `}
        >
          {label}
        </label>

        <input
          value={localSelected?.title|| ""}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Select Program"
          className={`w-full h-full rounded-[10px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}
          `}
        />

        {/* Arrow / Clear */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {localSelected && !readOnly ? (
            <button onClick={handleClear} className="text-gray-400 hover:text-black text-sm">
              ✕
            </button>
          ) : (
            <div className={`transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}>
              <AngleArrowSvg />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-md border border-black/20 shadow-lg z-[1000]">
          <ul className="py-2 max-h-[220px] overflow-auto">
            {isLoading && (
              <div className="flex justify-center py-4">
                <ClipLoader size={16} color="#000066" />
              </div>
            )}

            {isError && (
              <p className="text-center text-xs text-red-500 py-3">
                Failed to load Programs
              </p>
            )}

            {!isLoading && !isError && programs.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-3">
                No Programs found for this Pillar
              </p>
            )}

            {!isLoading && !isError && programs.length > 0 &&
              programs.map((program) => (
                <li
                  key={program._id}
                  onClick={() => handleSelect(program)}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {program.title}
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {/* Error */}
      {error && <span className="text-red-500 text-[11px] sm:text-xs">{error}</span>}
    </div>
  );
};

export default PillerSelectedInput;
