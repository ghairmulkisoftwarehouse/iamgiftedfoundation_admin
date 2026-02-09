import { useRef, useState } from "react";
import useClickOutside from "../../../utils/clickOutside";
import AngleArrowSvg from "../../../assets/svgs/AngleArrowSvg";
import devLog from "../../../utils/logsHelper";
import Axios from "../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setStats } from "../../../redux/slices/programPillarSlice";
import { ClipLoader } from "react-spinners";

const PillerSelectInput = ({
  label,
  selected,
  onSelect,
  error,
  readOnly = false,
}) => {
  const containerRef = useRef(null);
  const [localSelected,setLocalSelected]=useState('');
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { docs = [] } = useSelector((state) => state.programPillar);

  devLog(" this is a pillar docs", docs);

   const { isLoading, isError } = useQuery(
    ["fetch-all-pillarProgram", searchTerm],
    async () => {
      let url = `/piller/with-programs-list?sortBy=createdAt_descending`;

      if (searchTerm) {
        url += `&keyword=${encodeURIComponent(searchTerm)}`;
      }

      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;

        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  useClickOutside(containerRef, () => setShowMenu(false));

  const handleSelect = (item) => {
    onSelect(item?._id);
    setLocalSelected(item?.title);
    setShowMenu(false);
  };

  const handleClear = (e) => {
  e.stopPropagation(); // prevent dropdown toggle
  setLocalSelected("");
  setSearchTerm("");
  onSelect(null);
};

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const isActive = focused || !!selected;

  return (
    <div ref={containerRef} className="flex flex-col gap-1 relative">
      {/* Input Wrapper */}
      <div
        onClick={() => !readOnly && setShowMenu((prev) => !prev)}
        className={`relative h-[50px] rounded-[10px] border px-4 flex items-center cursor-pointer
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}
        `}
      >
    

        {/* Arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
  {localSelected && !readOnly ? (
    <button
      onClick={handleClear}
      className="text-gray-400 hover:text-black text-sm"
    >
      ✕
    </button>
  ) : (
    <div
      className={`transition-transform duration-200 ${
        showMenu ? "rotate-180" : ""
      }`}
    >
      <AngleArrowSvg />
    </div>
  )}
</div>

        {/* Floating Label */}
        <label
          className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
           ${
              isActive
                ? `-top-3 ${error ? "text-red-500" : "text-black"}`
                : "-top-3 text-lightGray"
            }
          `}
        >
          {label}
        </label>

       <input
       
          value={localSelected || ""}
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Select Piller"
          className={`w-full h-full  rounded-[10px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}
          `}
        />
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute left-0 top-[calc(100%+8px)] w-full bg-white rounded-md border border-black/20 shadow-lg z-[1000]">
        <div className="p-3">
            <input
              type="text"
              placeholder="Search pillar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <ul className="py-2 max-h-[220px] overflow-auto">
            {isLoading && (
              <div className="flex justify-center py-4">
                <ClipLoader size={16} color="#000066" />
              </div>
            )}

            {isError && (
              <p className="text-center text-xs text-red-500 py-3">
                Failed to load Piller
              </p>
            )}

            {!isLoading && !isError && docs.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-3">
                No Piller found
              </p>
            )}

            {!isLoading &&
              !isError &&
              docs.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Error */}
      {error && (
        <span className="text-red-500 text-[11px] sm:text-xs">
          {error}
        </span>
      )}
    </div>
  );
};

export default PillerSelectInput;
